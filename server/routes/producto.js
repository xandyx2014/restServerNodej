const express = require('express')
let app = express()
let {verficaToken,verificaAdmin_Role} = require('../middlewares/autenticacion')
let Producto = require('../models/producto')


app.get('/productos',verficaToken, (req, res)=> {

    let desde = req.query.desde || 0
    desde = Number(desde)
    let limite = req.query.limite || 5
    limite = Number(limite)
    Producto.find({})
    .skip(desde)
    .limit(limite)
    .populate('categoria','nombre')
    .populate('usuario','nombre email')
    .exec((err,producto)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Producto.count({},(err,counteo)=>{
            res.json({
                ok:true,
                producto,
                counteo
            })
        })
        
    })
});
app.get('/productos/:id',verficaToken,(req,res)=>{
    let id = req.params.id
    Producto.findById(id)
    .populate('usuario','nombre email')
    .populate('categoria','nombre')
    .exec((err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'el id no existe'
                }
            })
        }
        res.json({
            producto:productoDB
        })
    })
})

app.post('/productos',verficaToken,(req,res)=>{
    let body = req.body
    let producto = new Producto({
        usuario:req.usuario._id,
        nombre:body.nombre,
        precioUni:body.precioUni,
        descripcion:body.descripcion,
        disponible:body.disponible,
        categoria:body.categoria  
    })
    producto.save((err,productodb)=>{
        if(err){
            return res.status(500).json(
                {
                    ok:false,
                    err
                }
            )
        }
        res.status(200).json({
            ok:true,
            producto
        })
    })
})

app.get('/productos/buscar/:termino',verficaToken,(req,res)=>{
    let termino = req.params.termino
    let regex= new RegExp(termino,'i')
    Producto.find({nombre:regex})
            .populate('categoria','nombre')
            .exec((err,productoDB)=>{
                if (err) {
                    return res.status(500).json({
                        ok:false,
                        err
                    })
                }
                res.json({
                    ok:true,
                    productoDB
                })
            })
})

app.put('/productos/:id',(req,res)=>{
    let id = req.params.id
  
    let body=req.body
    Producto.findById(id,(err,productoDB)=>{
        if(err){
            return res.status(500).json(
                {
                    ok:false,
                    err
                }
            )
        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El id no existe'
                }
            })
        }
        productoDB.nombre=body.nombre
        productoDB.precioUni=body.precioUni
        productoDB.categoria=body.categoria
        productoDB.disponible=body.disponible
        productoDB.descripcion=body.descripcion
        productoDB.save((err,productoGuardado)=>{
            if(err){
                return res.status(500).json(
                    {
                        ok:false,
                        err
                    }
                )
            }
            res.json({
                ok:true,
                producto:productoGuardado
            })
        })
        

    })
})
app.delete('/productos/:id',(req,res)=>{
    let id = req.params.id
    Producto.findById(id)
    .exec((err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'el id no existe'
                }
            })
        }
        productoDB.disponible=false
        productoDB.save((err,productoBorrado)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
            res.json({
                ok:true,
                producto:productoBorrado,
                message:'producto borrado'
            })
        })
        
    })
})
module.exports=app
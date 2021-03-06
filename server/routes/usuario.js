const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const app = express()
const Usuario = require
('../models/usuario.js')
const {verficaToken,verificaAdmin_Role} = require('../middlewares/autenticacion.js')


app.get('/usuario',verficaToken, (req, res)=> {

    return res.json({
        usuario:req.usuario,
        nombre:req.usuario.nombre,
        email:req.usuario.email
    })

    let desde = req.query.desde || 0
    desde = Number(desde)

    let limite = req.query.limite || 5
    limite = Number(limite)
    Usuario.find({estado:true},'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((err,usuario)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Usuario.count({estado:true},(err,counteo)=>{
            res.json({
                ok:true,
                usuario,
                counteo
            })
        })
        
    })
});

app.post('/usuario',[verficaToken,verificaAdmin_Role], function (req, res) {

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })
    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // usuarioBD.password=null
        res.json({
            ok: true,
            usuario: usuarioBD
        })
    })



});

app.put('/usuario/:id',[verficaToken,verificaAdmin_Role], function (req, res) {

    let id = req.params.id
    let body = _.pick(req.body, [
        'nombre',
        'email',
        'img',
        'role',
        'estado'
    ])
    // new true devuelve el nuevo objecto acutalizado
    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBD
        })
    })


});

app.delete('/usuario/:id',[verficaToken,verificaAdmin_Role], function (req, res) {
    let id = req.params.id
    let cambiaEstado = {
        estado:'false'
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado,{
        new: true,
        runValidators: true
    }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBD
        })
    })

    
    // res.json('delete Usuario');
    /* let id = req.params.id
    Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err:{
                    message:'Usuario No encontrado'
                }
            });
        }
        res.json({
            ok:true,
            usuario:usuarioBorrado
        })
    }) */
});

module.exports = app
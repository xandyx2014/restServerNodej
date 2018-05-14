const express = require('express')
let {
    verficaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion')
let app = express()
let Categoria = require('../models/categoria')
app.get('/categoria/:id', [verficaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id
    Categoria.findById(id, 'nombre estado').exec((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message:'categoria no existe'
                }
            });
        }
        res.json({
            categoriaDB
        })
    })
})
//mostrar toda las categorias
app.get('/categoria', [verficaToken, verificaAdmin_Role], (req, res) => {

    Categoria.find({
        estado: true
    })
    .populate('usuario','nombre email')
    .exec((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            categoriaDB
        })
    })
})

//crear nueva categoria
app.post('/categoria', [verficaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body
    let categoria = new Categoria({
        nombre: body.nombre,
        usuario:req.usuario._id
    })
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // categoriaDB.password=null
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})
//mostrar una categoria por ID
app.put('/categoria/:id', [verficaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id
    let body = req.body
    Categoria.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

app.delete('/categoria/:id', (req, res) => {
    let id = req.params.id
    let cambiaEstado = {
        estado: 'false'
    }
    Categoria.findByIdAndUpdate(id, cambiaEstado, {
        new: true,
        runValidators: true
    }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})
module.exports = app
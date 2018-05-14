const mongoose = require('mongoose')
let Schema=mongoose.Schema
const uniqueValiadotr = require('mongoose-unique-validator')
let categoriaShema = new Schema({
    nombre:{
        type:String,
        required:[true,"el nombre es requerido"]
    }, 
    estado:{
        type:Boolean,
        default:true
    },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
})
module.exports=mongoose.model('Categoria',categoriaShema)
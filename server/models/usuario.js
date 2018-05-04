const mongoose = require('mongoose')
let Schema=mongoose.Schema
const uniqueValiadotr = require('mongoose-unique-validator')
let rolesValidos={
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUES} it is not a valid role'
}

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        require:[true,'The name is necessary']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'The email is necessary']
    },
    password:{
        type:String,
        required:[true,'The password is necessary']
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type:String,      
        default: 'USER_ROLE',
        enum:rolesValidos
        
        
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
    
})
usuarioSchema.methods.toJSON=function(){
    let user=this;
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}
usuarioSchema.plugin(uniqueValiadotr,{message:'{PATH} debe ser unico'})
module.exports=mongoose.model('Usuario',usuarioSchema)
//model('NAME',modelShema)
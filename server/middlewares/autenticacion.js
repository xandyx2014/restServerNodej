const jwt = require('jsonwebtoken')

// verficar token
let verficaToken= (req,res,next)=>{
    let token = req.get('token')
    jwt.verify(token,process.env.SEED,(err,decoded)=>
    {
        if(err){
            return res.status(401).json({
                ok:false,
                err:{
                    messagge:'token no valido'
                }
            })
        }
        req.usuario=decoded.usuario
        next()
    })
    
}
//======
//verifica Admin role
//=======
let verificaAdmin_Role= (req,res,next)=>{
    let usuario = req.usuario
    console.log(usuario);
    if(usuario.role=='ADMIN_ROLE'){
        next()
        return
    }else{
        res.json({
            ok:false,
            err:{
                message:'El usuario no es administrador'
            }
        })
    }
    
    
}
module.exports={
    verficaToken,
    verificaAdmin_Role
}





/**
 * Puerto
 */
process.env.PORT=process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let urlDB
if(process.env.NODE_ENV ==='dev'){
    urlDB='mongodb://localhost:27017/cafe'
}else{
    urlDB=process.env.MONGO_URI
}
process.env.URLDB=urlDB
//============================
// vencimiento del toke
//============================
process.env.CADUCIDAD_TOKE='48h'

process.env.SEED=process.env.SEED||'este-es-el-sedd-desarrollo'

//====================================
//Google client Id
//====================================
process.env.CLIENT_ID= process.env.CLIENT_ID || '304701983201-4ph32oetmq8qg2hp2dplghiku1p29jpa.apps.googleusercontent.com'


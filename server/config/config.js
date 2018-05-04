




/**
 * Puerto
 */
process.env.PORT=process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let urlDB
if(process.env.NODE_ENV ==='dev'){
    urlDB='mongodb://localhost:27017/cafe'
}else{
    urlDB='mongodb://xandyx2014:UPDATE33todeath@ds115340.mlab.com:15340/cafe'
}
process.env.URLDB=urlDB





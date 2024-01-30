const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '**********************',
    database: '*******************'
});

db.connect(error =>{
if(error){
    console.log("Mysql Connection Error", error);
}else {
    console.log("DB Connection Established");

}
});

module.exports = db;

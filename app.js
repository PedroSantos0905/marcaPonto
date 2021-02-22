const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
require("dotenv").config();

var connection=mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
});

app.set('views',path.join(__dirname,'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req, res) => {
    res.render('jogo_index', {
        title : 'MARCA PONTO'
    });
});

app.post('/novo_jogo',(req, res) => { 
    let data = {id_tipo_jogo: req.body.tipo_jogo};
    let sql = "INSERT INTO tb_jogo SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

module.exports = app;

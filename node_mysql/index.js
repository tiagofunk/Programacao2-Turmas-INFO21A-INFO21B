// npm init
// npm install --save-dev nodemon
// npm install express body-parser mysql
// Adicionar "start": "nodemon index.js" no arquivo package.json
// npm start

// create database node;
// use node;
// create table pessoas(
// 	id int primary key auto_increment,
//     nome varchar(30),
//     idade int
// );
// CREATE USER 'node'@'%' IDENTIFIED WITH mysql_native_password BY 'Abcd&123';
// GRANT ALL ON node.* TO 'node'@'%';

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "Abcd&123",
  database: "node"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(3000)

const jsonParser = bodyParser.json()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get("/pessoas/", function (req,res){
  var sql = "SELECT * FROM pessoas"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send( result )
  })
})

app.get("/pessoas/:id", function(req,res){
  var sql = "SELECT * FROM pessoas WHERE id = ?"
  var values = [req.params.id]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    if( result.length == 0 ){
      res.status( 404 ).send({})
    }else{
      res.send( result )
    }
  });
})

app.post("/pessoas/", jsonParser, function( req, res ){
  var sql = "INSERT INTO pessoas (nome, idade) VALUES (?,?)";
  var values = [req.body.nome, req.body.idade]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    const novaPessoa = {
      id: result.insertId,
      nome: req.body.nome,
      idade:req.body.idade
    };
    res.send( novaPessoa );
  });
});

app.put("/pessoas/:id",jsonParser, function(req,res){
  var sql = "UPDATE pessoas SET nome = ?, idade = ? WHERE id = ?";
  var values = [req.body.nome, req.body.idade, req.params.id]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    if( result.affectedRows == 0 ){
      res.status( 404 ).send( {} )
    }else{
      const novaPessoa = {
        id: result.insertId,
        nome: req.body.nome,
        idade:req.body.idade
      };
      res.send( novaPessoa );
    }
  });
});

app.delete("/pessoas/:id", jsonParser, function(req, res){
  var sql = "DELETE FROM pessoas WHERE id = ?";
  var values = [req.params.id]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
     if( result.affectedRows == 0 ){
      res.status( 404 ).send( {} );
    }else{
      res.status(204).send( {} );
    }
  });
  
});
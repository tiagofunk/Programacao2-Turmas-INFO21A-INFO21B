const express = require('express')
const bodyParser = require('body-parser')
var mysql = require('mysql')

const app = express()
const jsonParser = bodyParser.json()

app.listen(3000)

var con = mysql.createConnection({
  host: "localhost",
  user: "nodeApp",
  password: "Abcd&1234",
  database: "node"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado!");
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

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
        id: req.params.id,
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
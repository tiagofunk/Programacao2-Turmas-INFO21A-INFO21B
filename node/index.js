const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.listen(3000)

const jsonParser = bodyParser.json()

const pessoas = [
  {id:1, name:"Tiago"},
  {id:2, name:"Viviane"},
  {id:3, name:"Ana"},
]

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get("/pessoas/", function (req,res){
  res.send( pessoas )
})

app.get("/pessoas/:id", function(req,res){
  var p = pessoas.find( function( c ){
    return c.id == parseInt(req.params.id )
  } )
  if( !p ){
    //res.status( 404 ).send({})
    res.status( 404 ).send("Pessoa não encontrada")
  }else{
    res.send( p )
  }
})

app.post("/pessoas/", jsonParser, function( req, res ){
  var novo = salvarPessoa( req.body )
  res.send( novo );
});

function salvarPessoa(body){
  const novo = {
    id: pessoas.length + 1,
    name: body.name
  };
  pessoas.push( novo );
  return novo;
}

app.put("/pessoas/:id",jsonParser, function(req,res){
  const achado = pessoas.find(
    c => c.id === parseInt( req.params.id )
  )
  if( !achado ){
    res.status( 404 ).send( "A pessoa com esse id não foi encontrado" )
  }else{
    achado.name = req.body.name
    res.send( achado )
  }
});

app.delete("/pessoas/:id", jsonParser, function(req, res){
  const achado = pessoas.find(
    c => c.id === parseInt( req.params.id )
  );
  if( !achado ){
    res.status( 404 ).send( "A pessoa com esse id não foi encontrado" );
  }else{
    const index = pessoas.indexOf( achado );
    pessoas.splice( index, 1 );

    res.send( achado );
  }
});
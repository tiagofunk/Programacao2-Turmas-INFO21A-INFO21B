// npm init
// npm install --save-dev nodemon
// npm install express body-parser
// Adicionar "start": "nodemon index.js" no arquivo package.json
// npm start

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.listen(3000)

const jsonParser = bodyParser.json()

const pessoas = [
  {id:1, nome:"Tiago"},
  {id:2, nome:"Viviane"},
  {id:3, nome:"Ana"},
]

app.get('/', function (requisicao,resposta) {
  resposta.send('Hello World')
})

app.get("/pessoas/", function (requisicao,resposta){
  resposta.send( pessoas )
})

app.get("/pessoas/:id", function(requisicao,resposta){
  var pessoaEncontrada = pessoas.find( function( pessoaAtual ){
    return pessoaAtual.id == parseInt(requisicao.params.id )
  } )
  if( !pessoaEncontrada ){
    res.status( 404 ).send({})
  }else{
    resposta.send( pessoaEncontrada )
  }
})

app.post("/pessoas/", jsonParser, function( requisicao, resposta ){
  const novaPessoa = {
    id: pessoas.length + 1,
    nome: requisicao.body.nome
  };
  pessoas.push( novaPessoa );
  resposta.send( novaPessoa );
});

app.put("/pessoas/:id",jsonParser, function(requisicao,resposta){
  const pessoaEncontrada = pessoas.find( function( pessoaAtual ){
    return pessoaAtual.id == parseInt( requisicao.params.id )
  }
  )
  if( !pessoaEncontrada ){
    resposta.status( 404 ).send({})
  }else{
    pessoaEncontrada.nome = requisicao.body.nome
    resposta.send( pessoaEncontrada )
  }
});

app.delete("/pessoas/:id", jsonParser, function(req, res){
  const pessoaEncontrada = pessoas.find( function( pessoaAtual ){
    return pessoaAtual.id == parseInt( req.params.id )
  });
  if( !pessoaEncontrada ){
    res.status( 404 ).send( "A pessoa com esse id não foi encontrado" );
  }else{
    const index = pessoas.indexOf( pessoaEncontrada );
    pessoas.splice( index, 1 );
    res.send( pessoaEncontrada );
  }
});
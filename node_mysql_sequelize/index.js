const express = require('express')
const banco = require("./banco")
const pessoa = require("./pessoa")

const app = express()
app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

banco.conexao.sync( function(){
    console.log("Banco de dados conectado.");
})

const PORTA = 3000
app.listen( PORTA, function(){
    console.log("Servidor iniciados na porta "+PORTA);
})

app.get("/pessoas/",async function(req, res) {
    const resultado = await pessoa.pessoa.findAll()
    res.json(resultado);
})

app.get("/pessoas/:id",async function(req, res) {
    const resultado = await pessoa.pessoa.findByPk(req.params.id)
    if( resultado == null ){
        res.status(404).send({})
    }
    res.json(resultado);
})

app.get("/pessoas/nome/:nome",async function(req, res) {
    const resultado = await pessoa.pessoa.findAll({
        where:{ nome:req.params.nome }
    })
    if( resultado == null ){
        res.status(404).send({})
    }
    res.json(resultado);
})

app.post("/pessoas/",async function(req,res){
    const resultado = await pessoa.pessoa.create({
        nome:req.body.nome,
        idade:req.body.idade
    })
    res.json(resultado)
})

app.put("/pessoas/:id",async function(req,res){
    const resultado = await pessoa.pessoa.update({
        nome:req.body.nome,
        idade:req.body.idade
    },{
        where:{id: req.params.id}
    })
    if( resultado == 0){
        res.status(404).send({})
    }else{
        res.json( await pessoa.pessoa.findByPk(req.params.id))
    }
})

app.delete("/pessoas/:id",async function(req,res){
    const resultado = await pessoa.pessoa.destroy({
        where:{
            id:req.params.id
        }
    })
    if( resultado == 0 ){
        res.status(404).send({})
    }else{
        res.status(204).send({})
    }
})
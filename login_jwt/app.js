require('dotenv').config()
const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const https = require('https')
const fs = require(`fs`);
const cors = require('cors');
const banco = require("./banco")
const Usuario = require("./Usuario")

async function encontrarUsuarioPorEmail(email){
  const resultado = await Usuario.Usuario.findAll({
    where:{ email:email }
  })
  if( resultado.length == 0 ) return null
  return resultado[0]
}
async function encontrarUsuarioPorId(id){
  const resultado = await Usuario.Usuario.findByPk(id)
  return resultado
}

const portaServidor = 3000
const app = express()
app.use(express.json())
app.use(cookieParser())
banco.conexao.sync( function(){
  console.log("Banco de dados conectado.");
})

const corsOptions = {
  origin: ['http://127.0.0.1:5500'],
  methods: 'GET,POST'
};

app.use(cors(corsOptions));

// app.listen(portaServidor,()=>{
//   console.log("Servidor rodando na porta "+portaServidor);
// })

var options =  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  }

https.createServer(options, app).listen(portaServidor,()=>{
  console.log("Servidor conectado na porta "+ portaServidor);
});

app.get("/",(req,res)=>{
  res.status(200).json({msg:"Sucesso"})
})

// Registrar Usuário
app.post('/auth/register/',async(req,res)=>{
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  if( !name ){
    return res.status(422).send({msg:"O nome é obrigatório"})
  }
  if( !email ){
    return res.status(422).send({msg:"O email é obrigatório"})
  }
  if( !password ){
    return res.status(422).send({msg:"A senha é obrigatória"})
  }
  if( password != confirmPassword ){
    return res.status(422).send({msg:"As senhas não conferem"})
  }
  const usuario = await encontrarUsuarioPorEmail(email)
  if( usuario != null ){
    return res.status(422).send({msg:"Email já utilizado"})
  }
  const salt = await bcryptjs.genSalt(12)
  const passwordHash = await bcryptjs.hash(password,salt)

  const resultado = await Usuario.Usuario.create({
    "nome":name,
    "email":email,
    "hash":passwordHash
  })
  res.status(201).send({msg:"Usuário criado com sucesso"})
})

app.post("/auth/user/", async(req,res)=>{
  const email = req.body.email
  const password = req.body.password
  if( !email ){
    return res.status(422).send({msg:"O email é obrigatório"})
  }
  if( !password ){
    return res.status(422).send({msg:"A senha é obrigatória"})
  }

  const usuario = await encontrarUsuarioPorEmail(email)
  if( usuario == null ){
    return res.status(422).send({msg:"Usuário não encontrado"})
  }
  const checkPassword = await bcryptjs.compare(password, usuario.hash)
  if( !checkPassword ){
    return res.status(422).send({msg:"Senha Inválida"})
  }

  try{
    const secret = process.env.SECRET

      const token = jwt.sign({
        id:usuario.id
      }, secret, { expiresIn: "24h" } )

    //res.cookie('auth',token);
    res.status(200).json({msg:"Autenticação realizada com sucesso!",id:usuario.id,token})
  }catch(error){
    console.log(error);
    return res.status(500).send({msg:"Erro no servidor. Tente novamente mais tarde!"})
  }
})

// Adicionar o checkToken em todos as URLS que você quer proteger.
app.get("/user/:id", checkToken, async(req,res) => {
  const id = req.params.id
  const usuario = await encontrarUsuarioPorId(id)
  if( usuario == null ){
    return res.status(404).send({msg:"Usuário não encontrado"})
  }
  
  // Adicionar depois para mostrar que só esta logado.
  var infoToken = jwt.verify(req.headers.token, process.env.SECRET);
  if( usuario.id != infoToken.id){
    return res.status(401).send({msg:"Acesso Negado!"})
  }

  res.status(200).send({id:usuario.id, nome:usuario.nome,email:usuario.email})
})

function checkToken(req,res,next){
  const token = req.headers.token
  if (token) {

    jwt.verify(token, process.env.SECRET, function(err, token_data) {
      if (err) {
         return res.status(400).send({msg:"Token inválido"})
      } else {
        next();
      }
    });

  } else {
    return res.status(401).send({msg:"Acesso Negado!"})
  }
}
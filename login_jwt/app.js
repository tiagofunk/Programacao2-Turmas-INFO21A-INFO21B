require('dotenv').config()
const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const banco = require("./banco")
const Usuario = require("./Usuario")

async function encontrarUsuarioPorEmail(email){
  const resultado = await await Usuario.Usuario.findAll({
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
banco.conexao.sync( function(){
  console.log("Banco de dados conectado.");
})
app.listen(portaServidor,()=>{
  console.log("Servidor conectado na porta "+ portaServidor);
})

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
    "hash":passwordHash,
    "token":""
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
    }, secret )

    await Usuario.Usuario.update({
      token: token
  },{
      where:{id: usuario.id}
  })
    res.status(200).json({msg:"Autenticação realizada com sucesso!",token})
  }catch(error){
    console.log(error);
    return res.status(500).send({msg:"Erro no servidor. Tente novamente mais tarde!"})
  }
})

app.get("/user/:id", checkToken, async(req,res) => {
  const id = req.params.id
  const usuario = await encontrarUsuarioPorId(id)
  if( usuario == null ){
    return res.status(404).send({msg:"Usuário não encontrado"})
  }
  
  // Adicionar depois para mostrar que só esta logado.
  if( usuario.token != req.headers["authorization"].split(" ")[1]){
    return res.status(401).send({msg:"Acesso Negado!"})
  }
  console.log(usuario.hash)
  delete usuario.hash
  delete usuario.token
  res.status(200).send({id:usuario.id, nome:usuario.nome,email:usuario.email})
})

function checkToken(req,res,next){
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if( !token ){
    return res.status(401).send({msg:"Acesso Negado!"})
  }

  try{
    const secret = process.env.SECRET
    jwt.verify(token,secret)
    next()
  }catch(error){
    res.status(400).send({msg:"Token inválido"})
  }
}
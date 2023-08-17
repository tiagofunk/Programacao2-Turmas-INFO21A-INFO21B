const URL_AUTH = "https://localhost:3000/auth/register/"

var botaoCadastrar = document.getElementById("botaoCadastrar")
botaoCadastrar.addEventListener("click",()=>{
    var nome = document.getElementById("campoNome").value
    var email = document.getElementById("campoEmail").value
    var senha = document.getElementById("campoSenha").value
    var confirmarSenha = document.getElementById("campoConfirmarSenha").value

    enviaPOST( nome, email, senha, confirmarSenha )
})

function enviaPOST( name, email, password, confirmPassword ){
    var header = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name, email, password, confirmPassword
        })
    }
    fetch(URL_AUTH,header)
    .then(function(response){
        if (!response.ok && response.status === 422) {
            return response.json();            
        }else if(response.ok && response.status == 201 ) {
            window.location.href = "login.html"
        }
        throw new Error('Erro na requisição');
    }).then(function(data){
        console.log(data);
        var mensagemErro = document.getElementById("mensagemErro")
        mensagemErro.innerText = data.msg
        mensagemErro.style.display = "block"
    }).catch(function(error){
        console.log(error)
    })
}
const URL_AUTH = "https://localhost:3000/auth/user/"

var botaoCadastrar = document.getElementById("botaoLogin")
botaoCadastrar.addEventListener("click",()=>{
    var email = document.getElementById("campoEmail").value
    var senha = document.getElementById("campoSenha").value

    enviaPOST( email, senha )
})

function enviaPOST( email, password ){
    var header = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            email, password
        })
    }
    var status = 0
    fetch(URL_AUTH,header)
    .then(function(response){
        status = response.status
        return response.json()
    }).then( function(data){
        if (status == 422) {
            if( data != undefined ){
                var mensagemErro = document.getElementById("mensagemErro")
                mensagemErro.innerText = data.msg
                mensagemErro.style.display = "block"
            }
        }else if(status == 200 ) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            window.location.href = "index.html"
        }
    })
    .catch(function(error){
        console.log(error)
    })
}
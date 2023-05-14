const URL = "http://localhost:3000/pessoas/"

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click", function(){
    var nomePessoa = document.getElementById("campoNome").value
    var idadePessoa = parseInt( document.getElementById("campoIdade").value )

    var header = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            nome:nomePessoa,
            idade:idadePessoa
        })
    }
    fetch(URL,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'index.html';
    }).catch(function(){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
    })
})
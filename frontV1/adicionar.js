const URL = "http://localhost:3000/pessoas/"

var idPessoa = null
lerParametros()

function lerParametros(){
    const urlParams = new URLSearchParams(window.location.search);
    idPessoa = urlParams.get("id")
    var nome = urlParams.get("nome")
    var idade = urlParams.get("idade")

    document.getElementById("campoNome").value = nome
    document.getElementById("campoIdade").value = idade
}

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click", function(){
    var nomePessoa = document.getElementById("campoNome").value
    var idadePessoa = parseInt( document.getElementById("campoIdade").value )

    if( idPessoa != null ){
        enviaPUT(idPessoa, nomePessoa, idadePessoa)
    }else{
        enviaPOST( nomePessoa, idadePessoa )
    }
})

function enviaPUT( id, nomePessoa, idadePessoa ){
    var header = {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            nome:nomePessoa,
            idade:idadePessoa
        })
    }
    fetch(URL+id,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'index.html';
    }).catch(function(){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
    })
}

function enviaPOST( nomePessoa, idadePessoa ){
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
}
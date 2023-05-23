const URL = "http://localhost:3000/pessoas/"
var listaPessoas = []

function iniciarTabela(){
    return `<div class="linhaPessoas">
                <p class="item">Id</p>
                <p class="item">Nome</p>
                <p class="item">Idade</p>
                <p class="item">Alterar</p>
                <p class="item">Excluir</p>
            </div>`;
}

function criarLinhaPessoas(pessoa){
    return `<div class="linhaPessoas">
                <p class="item">`+pessoa.id+`</p>
                <p class="item">`+pessoa.nome+`</p>
                <p class="item">`+pessoa.idade+`</p>
                <p class="item"><img class="icone lapis" src="../img/lapis.jpg" alt="icone lápis"></p>
                <p class="item"><img class="icone lixeira" src="../img/lixeira.png" alt="icone lixeira"></p>
            </div>`;
}

function adicionarPessoas(){
    var tabelaPessoas = document.getElementById("tabelaPessoas")
    tabelaPessoas.innerHTML += iniciarTabela()
    for (let i = 0; i < listaPessoas.length; i++) {
        const pessoa = listaPessoas[i];
        tabelaPessoas.innerHTML += criarLinhaPessoas(pessoa)
    }
    cadastrarEventosLapis()
    cadastrarEventosLixeira()
}

fetch(URL).then(function(response) {
    return response.json();
}).then(function(data) {
    listaPessoas = data
    adicionarPessoas()
}).catch(function() {
    console.log("Houve algum problema!");
});

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click",function(){
    window.location.href = 'adicionar.html';
})

function atualizarTela(id){
    listaPessoas = listaPessoas.filter( p => p.id != id)
    var tabelaPessoas = document.getElementById("tabelaPessoas")
    tabelaPessoas.innerHTML = ""
    adicionarPessoas()
}

function realizarExclusao(id){
    var header = {
        method:"DELETE"
    }
    fetch(URL+id,header)
    .then(function(response){
        return response.text()
    }).then(function(data){
        atualizarTela(id)
    }).catch(function(error){
        alert("Erro ao deletar pessoa")
    })
}

function cadastrarEventosLixeira(){
    var lixeiras = document.getElementsByClassName("lixeira")
    for (let i = 0; i < lixeiras.length; i++) {
        const l = lixeiras[i];
        l.addEventListener("click",function(event){
            var id = event.target.parentElement.parentElement.children[0].innerText
            realizarExclusao(id)
        })
    }
}

function editarURL(url, id, nome, idade){
    return url+'?id='+id+'&nome='+nome+'&idade='+idade
}

function cadastrarEventosLapis(){
    var lapis = document.getElementsByClassName("lapis")
    for (let i = 0; i < lapis.length; i++) {
        const l = lapis[i];
        l.addEventListener("click",function(event){
            var id = event.target.parentElement.parentElement.children[0].innerText
            var nome = event.target.parentElement.parentElement.children[1].innerText
            var idade = event.target.parentElement.parentElement.children[2].innerText
            window.location.href = editarURL("adicionar.html",id,nome,idade);
        })
    }
}
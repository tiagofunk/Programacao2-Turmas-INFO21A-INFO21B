const URL = "http://localhost:3000/pessoas/"
var listaPessoas = []

function iniciarTabela(){
    return `<div class="linhaPessoas">
                <p class="item">Id</p>
                <p class="item">Nome</p>
                <p class="item">Idade</p>
                <p class="item">Excluir</p>
            </div>`;
}

function criarLinhaPessoas(pessoa){
    return `<div class="linhaPessoas">
                <p class="item">`+pessoa.id+`</p>
                <p class="item">`+pessoa.nome+`</p>
                <p class="item">`+pessoa.idade+`</p>
                <img class="lixeira item" src="../img/lixeira.png" alt="">
            </div>`;
}

function adicionarPessoas(){
    var tabelaPessoas = document.getElementById("tabelaPessoas")
    tabelaPessoas.innerHTML += iniciarTabela()
    for (let i = 0; i < listaPessoas.length; i++) {
        const pessoa = listaPessoas[i];
        tabelaPessoas.innerHTML += criarLinhaPessoas(pessoa)
    }
}
fetch(URL).then(function(response) {
    return response.json();
}).then(function(data) {
    listaPessoas = data
    adicionarPessoas()
    cadastrarEventosLixeira()
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
            realizarExclusao(event.target.parentElement.children[0].innerText)
        })
}
}
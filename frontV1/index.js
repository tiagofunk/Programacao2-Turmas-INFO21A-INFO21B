const URL = "http://localhost:3000/pessoas/"

function criarLinhaPessoas(pessoa){
    return `<div id="linhaPessoas">
                <p id="item">`+pessoa.id+`</p>
                <p id="item">`+pessoa.nome+`</p>
                <p id="item">`+pessoa.idade+`</p>
            </div>`;
}

function adicionarPessoas(listaPessoas){
    var tabelaPessoas = document.getElementById("tabelaPessoas")
    for (let i = 0; i < listaPessoas.length; i++) {
        const pessoa = listaPessoas[i];
        tabelaPessoas.innerHTML += criarLinhaPessoas(pessoa)
    }
}
fetch(URL).then(function(response) {
    return response.json();
}).then(function(data) {
    adicionarPessoas(data)
}).catch(function() {
    console.log("Houve algum problema!");
});

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click",function(){
    window.location.href = 'adicionar.html';
})
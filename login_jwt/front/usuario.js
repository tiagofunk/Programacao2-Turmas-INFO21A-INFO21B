const URL_USER = "https://localhost:3000/user/"

enviaGET(localStorage.getItem('id'))

function enviaGET( id ){
    var header = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "token":localStorage.getItem('token')
        }
    }
    var status = 0
    fetch(URL_USER+id,header)
        .then(function(response) {
            status = response.status
            return response.json()
    }).then(function(data){
        if (status == 400  || status === 401 || status === 404) {
            var dadosUsuarios = document.getElementById("dadosUsuarios")
            dadosUsuarios.innerHTML = 'Acesso Negado'
            dadosUsuarios.style.color = "red"
        }else if(status == 200 ) {
            var dadosUsuarios = document.getElementById("dadosUsuarios")
            dadosUsuarios.innerHTML = ''
            dadosUsuarios.innerHTML += `<p>Id:`+data.id+`</p>`
            dadosUsuarios.innerHTML += `<p>Nome:`+data.nome+`</p>`
            dadosUsuarios.innerHTML += `<p>Email:`+data.email+`</p>`
        }
    }).catch(function(err) {
        console.log(err);
    });
}
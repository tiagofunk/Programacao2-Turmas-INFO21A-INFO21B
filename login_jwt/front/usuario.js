const URL_USER = "https://localhost:3000/user/"

enviaGET(1)

function enviaGET( id ){
    var header = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "token":localStorage.getItem('token')
        }
    }
    fetch(URL_USER+id,header).then(function(response) {
        if (!response.ok && (response.status == 404 || response.status === 401)) {
            response.json().then( (data)=>{
                var dadosUsuarios = document.getElementById("dadosUsuarios")
                dadosUsuarios.innerHTML = 'Acesso Negado'
                dadosUsuarios.style.color = "red"
            })
        }else if(response.ok && response.status == 200 ) {
            response.json().then( (data)=>{
                var dadosUsuarios = document.getElementById("dadosUsuarios")
                dadosUsuarios.innerHTML = ''
                dadosUsuarios.innerHTML += `<p>Id:`+data.id+`</p>`
                dadosUsuarios.innerHTML += `<p>Nome:`+data.nome+`</p>`
                dadosUsuarios.innerHTML += `<p>Email:`+data.email+`</p>`
            })
        }
    }).catch(function(err) {
        console.log(err);
    });
}
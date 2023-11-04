const URL_USER = "https://localhost:3000/user/"

enviaGET(1)

function enviaGET( id ){
    fetch(URL_USER+id).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    }).catch(function(err) {
        console.log(err);
    });
}
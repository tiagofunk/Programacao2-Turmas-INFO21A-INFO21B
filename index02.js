// window.document.write(window.document.URL)

// Marca ou TagName
// var p = document.getElementsByTagName("p")
// var p1 = p[0]
// var p2 = p[1]

// document.write(p1.innerText)
// p1.style.color = "blue"

// document.write(p2.innerHTML)

// Id
// var d = document.getElementById("msg")
// d.style.color = "green"
// d.innerText = "Aguardando..."

// Seletor Recente
// var d = document.querySelector("div#msg")
// d.style.backgroundColor = "blue"

var d = document.getElementById("area")
function clickou(){
    d.innerText = "Clickou"
} 
d.addEventListener("click", clickou)

d.addEventListener("mouseenter",()=>{
    d.innerText = "Entrou"
})

d.addEventListener("mouseout",()=>{
    d.innerText = "Saiu"
})

document.getElementById("somar").addEventListener("click",somar)
//document.getElementById("somar").addEventListener("click",somar())

function somar(){
    var tn1 = document.getElementById("txtn1")
    var tn2 = document.getElementById("txtn2")
    var res = document.getElementById("resultado")

    var n1 = parseInt( tn1.value )
    var n2 = parseInt( tn2.value )

    var s = n1+n2
    res.innerText = "A soma é " + s
}

document.getElementById("verifica").addEventListener("click",verifica)
function verifica(){
    var n1 = parseInt( document.getElementById("txtn3").value )
    var res = document.getElementById("resultado_par_ou_impar")

    if( n1 % 2 == 0 ){
        res.innerText = "par"
    }else{
        res.innerText = "impar"
    }
}

document.getElementById("tabuada").addEventListener("click",tabuada)
function tabuada(){
    var n = parseInt( document.getElementById("txtn4").value )
    var res = document.getElementById("resultado_tabuada")

    for (let i = 0; i < 10; i++) {
        res.innerHTML += "<p>"+n+"x"+i+"="+(i*n)+"</p>"
    }      

}
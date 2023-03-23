var a = [] // Vetor vazio
var num = [5,8,4]
num[3] = 6
console.log(num);
num.push(7);
console.log(num);

num[10]=10
console.log(num)

console.log(num.length);

for (let index = 0; index < num.length; index++) {
    console.log(num[index]);
    
}

num.sort()
console.log(num)

num.indexOf(7)
num.indexOf(3)

function parimp(numero){
    if( numero%2==0 ){
        return "Par"
    }else{
        return "Ímpar"
    }
}


var pessoas = {
    nome:"Tiago",
    sexo:'m',
    peso:85,
    engordar(p){
        console.log("Engordou")
        this.peso += p
    }
}

console.log(pessoas);

pessoas.engordar(2.0)

console.log(pessoas)

pessoas.idade = 27;
console.log(pessoas);
var resposta = document.getElementById('resposta');
var input = document.getElementById("ra"); 
var button = document.getElementById("button");
var requestURL = 'https://mts10.github.io/Json-Trabalho/faltas.json';;
var request = new XMLHttpRequest();
var response;

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    response = request.response;
    console.log(response);
}

button.addEventListener("click", function(e) {  
    e.preventDefault();
});

function getFaltas() {
    resposta.innerText = "";
    resposta.style = "border: 1px solid black;";
    resposta.style = "text-align: center";
    

    
    var ru = input.value;

    var dado = response.filter(dado => dado["ru"] == ru)[0];

    if(dado) {
        var registro = document.createElement('p');
        registro.textContent = `Registro Acadêmico: ${dado["ru"]}`;
        resposta.appendChild(registro);

        var nome = document.createElement('p');
        nome.textContent = `Nome do Aluno: ${dado["nome"]}`;
        resposta.appendChild(nome);

        var faltas = document.createElement('p');
        faltas.textContent = `Faltas: ${dado["faltas"]}`;
        resposta.appendChild(faltas);

    } else {
        var par = document.createElement("p");
        par.id = "naoEncontrado";
        par.textContent = `Nenhum aluno foi encontrado com o RA: ${ru}`;
        resposta.appendChild(par);
    }
}
function checkValue() {
    var ru = input.value;

    if(!ru || ru < 1) {
        button.setAttribute("disabled", "disabled");
    } else {
        button.removeAttribute("disabled");
    }
}
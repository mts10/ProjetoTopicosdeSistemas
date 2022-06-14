var resposta = document.getElementById('resposta');
var diaProva = document.getElementById('idDia');
var materia = document.getElementById('materia');
var titulo = document.getElementById('titulo');
var button = document.getElementById('button');
var requestURL = 'https://mts10.github.io/Json-Trabalho/agendaProvas.json';
var request = new XMLHttpRequest();
var response;

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    response = request.response;
}
button.addEventListener("click", function(e) {  
    e.preventDefault();
});

function getProvas() {
    resposta.innerText = "";
    resposta.style = "border: 1px solid black;";
    resposta.style = "text-align: center";

    var ru = diaProva.value;

    var dado = response.filter(dado => dado['ru'] == ru)[0];

    if(dado) {

    var materia = document.createElement('p');
    materia.textContent = `Materia da Prova: ${dado['materia']}`;
    resposta.appendChild(materia);

    var titulo = document.createElement('p');
    titulo.textContent = `Titulo da Prova: ${dado['titulo']}`;
    resposta.appendChild(titulo);

    } else {
        var error = document.createElement("p");
        error.textContent = `Nenhuma Prova esta agendada para esse dia.`;
        resposta.appendChild(error);
    }
   





    



}
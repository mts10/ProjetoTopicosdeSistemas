var resposta = document.getElementById('notas');
var aluno = document.getElementById('idAluno');
var nota =  document.getElementById('notaProva');
var materia = document.getElementById('idMateria');
var button = document.getElementById('button');
var requestURL = 'https://mts10.github.io/Json-Trabalho/cadNotas.json';
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

function getNotas() {
    resposta.innerText = "";
    resposta.style = "border: 1px solid black;";
    resposta.style = "text-align: center";

    var ru = aluno.value;

    var dado = response.filter(dado => dado['ru'] == ru)[0];

if(dado) {
     var nome = document.createElement('p');
    nome.textContent = `Nome do Aluno: ${dado['nome']}`;
    resposta.appendChild(nome);

    var materia = document.createElement('p');
    materia.textContent = `Matéria: ${dado['materia']}`;
    resposta.appendChild(materia);

    var nota = document.createElement('p');
    nota.textContent = `Nota: ${dado['nota']}` ;
    resposta.appendChild(nota);

} else {
    var error = document.createElement("p");
    error.textContent = `Nenhuma nota ou dado foi encontrado.`;
    resposta.appendChild(error); 
}

}
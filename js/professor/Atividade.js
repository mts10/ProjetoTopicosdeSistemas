var resposta = document.getElementById('resposta');
var aluno = document.getElementById('idAluno');
var email = document.getElementById('email');
var atiExtra = document.getElementById('atividadeExtra');
var button = document.getElementById('button');
var requestURL = 'https://mts10.github.io/Json-Trabalho/atividadeExtra.json';
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

function getAtividades() {
    resposta.innerText = "";
    resposta.style = "border: 1px solid black;";
    resposta.style = "text-align: center";

    var ru = aluno.value;

    var dado = response.filter(dado => dado['ru'] == ru)[0];

    if(dado) {
      var email = document.createElement('p');
    email.textContent = `Email do Aluno: ${dado['email']}`;
    resposta.appendChild(email);

    var atiExtra = document.createElement('p');
    atiExtra.textContent = `Atividade Extra: ${dado['atiExtra']}`;
    resposta.appendChild(atiExtra); 

    } else {
    var error = document.createElement("p");
    error.textContent = `Desculpe houve um erro no sistema e nao foi possivel cadastrar a atividade. Tente novamente mais tarde.`;
    resposta.appendChild(error);
    }
    

}
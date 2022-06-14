var container = document.getElementById('container');
var semMensagem = document.getElementById('semMensagem'); 
var requestURL = 'https://maxel-uds.github.io/JSON-Trabalho-TES/mensagensRecebidas.json';
var request = new XMLHttpRequest();
var response;

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    response = request.response;

    if(!response) {
        semMensagem.style = "display: table;";
    } else {
        showMensagens(request.response);
    }    
}

function showMensagens(response) {
    response.forEach(objeto => {
        var botao = document.createElement('button')
        var div = document.createElement('div');
        var email = document.createElement('p');
        var mensagem = document.createElement('p');

        div.className = "mensagem";
        div.id = objeto["id"];
        botao.className = "botao";
        botao.setAttribute("onclick", `respondida(${objeto["id"]})`);

        email.textContent = `Remetente: ${objeto["email"]}`;
        mensagem.textContent = `Mensagem: ${objeto["mensagem"]}`;
        botao.textContent = 'RESPONDIDO';

        div.appendChild(email);
        div.appendChild(mensagem);
        div.appendChild(botao);
        container.appendChild(div);
    });
}

function respondida(id) {
    var mensagemRespondida = document.getElementById(id);
    container.removeChild(mensagemRespondida);
    checarCaixaDeEntrada();
}

function checarCaixaDeEntrada() {
    var numeroDeMensagens = document.getElementsByClassName("mensagem");

    if(numeroDeMensagens.length == 0) {
        semMensagem.style = "display: table;";
    }
}
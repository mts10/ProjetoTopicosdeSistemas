var atividadeExtra = document.getElementById('atividadeExtra');
var select = document.getElementById('select');
var button = document.getElementById("button");
var requestURL = 'https://maxel-uds.github.io/JSON-Trabalho-TES/consultarAtividadeExtra.json';
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

function getAtividadeExtra() {
    atividadeExtra.innerText = "";

    var atividadeId = select.value;
    var atividadeInfo = response.filter(professor => professor["atividades"].filter(atividade => atividade["id"] == atividadeId)[0])[0];
    var tabela = createTituloTabela(atividadeInfo["professor"]);

    atividadeInfo["atividades"].forEach(atividade => {
        var nomeAtv = atividade["nome"];
        var idAtv = atividade["id"];

        var linha = document.createElement('tr');
        var nome = document.createElement('td');
        var id = document.createElement('td');
                        
        nome.textContent = nomeAtv;
        id.textContent = idAtv;

        linha.appendChild(nome);
        linha.appendChild(id);
        tabela.appendChild(linha);
    });

    atividadeExtra.appendChild(tabela);
}

function createTituloTabela(professor) {
    var tabela = document.createElement('table');
    var linha = document.createElement('tr');
    var titulo = document.createElement('th');

    titulo.colSpan = 2;
    titulo.textContent = `Professor ${professor["nome"]}`;
    titulo.className = "titulo";
    
    linha.appendChild(titulo)
    tabela.appendChild(linha);

    return createTable(tabela);
}

function createTable(tabela) {
    var linha = document.createElement('tr');
    var nome = document.createElement('th');
    var codigo = document.createElement('th');
    
    nome.textContent = `Atividade`;
    codigo.textContent = `Código`;
    
    linha.appendChild(nome);
    linha.appendChild(codigo);
    tabela.appendChild(linha);
    
    return tabela;
}
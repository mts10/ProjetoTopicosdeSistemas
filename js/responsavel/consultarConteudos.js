var conteudos = document.getElementById('conteudos');
var input = document.getElementById('input');
var button = document.getElementById("button");
var requestURL = 'https://maxel-uds.github.io/JSON-Trabalho-TES/conteudos.json';
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

function getConteudos() {
    conteudos.innerText = "";

    var id = input.value;
    var materia = response.filter(materia => materia["materiaId"] == id)[0];

    if(materia) {
        populate(materia);
    } else {
        var par = document.createElement("p");
        par.id = "naoEncontrado";
        par.style = "border: 1px solid black; padding: 20px;";
        par.textContent = `Nenhuma matéria foi encontrada com o id: ${id}`;
        conteudos.appendChild(par);
    }
}

function createTituloTabela(tituloTabela) {
    var tabela = document.createElement('table');
    var linha = document.createElement('tr');
    var titulo = document.createElement('th');

    titulo.colSpan = 4;
    titulo.textContent = tituloTabela;
    titulo.className = "titulo";
    tabela.className = "tabelaConteudos";
    
    linha.appendChild(titulo)
    tabela.appendChild(linha);

    return tabela;
}

function createTable(tabela) {
    var linha = document.createElement('tr');
    var nome = document.createElement('th');
    var preco = document.createElement('th');
    var carga = document.createElement('th');
    var conteudo = document.createElement('th');
    
    nome.textContent = "Disciplina";
    carga.textContent = "Carga Horária";
    preco.textContent = "Preço";
    conteudo.textContent = "Ementa";
    
    linha.appendChild(nome);
    linha.appendChild(carga);
    linha.appendChild(preco);
    linha.appendChild(conteudo);
    tabela.appendChild(linha);
    
    return tabela;
}

function populate(materia) {
    var tabela = createTable(createTituloTabela(materia["nome"]));

    var linha = document.createElement('tr');
    var nome = document.createElement('td');
    var preco = document.createElement('td');
    var carga = document.createElement('td');
    var conteudo = document.createElement('td');
    
    nome.textContent = materia["nome"];
    carga.textContent = `${materia["cargaHoraria"]} H`;
    preco.textContent = `R$ ${materia["preco"]}`;
    conteudo = formatConteudos(materia["conteudos"], conteudo);
    
    linha.appendChild(nome);
    linha.appendChild(carga);
    linha.appendChild(preco);
    linha.appendChild(conteudo);
    tabela.appendChild(linha);
    

    conteudos.appendChild(tabela);
}

function formatConteudos(cont, td) {

    cont.forEach(conteudo => {
        var p = document.createElement('p');
        p.textContent = conteudo;
        td.appendChild(p);
    });

    return td;
}

function checkValue() {
    var ru = input.value;

    if(!ru || ru < 1) {
        button.setAttribute("disabled", "disabled");
    } else {
        button.removeAttribute("disabled");
    }
}
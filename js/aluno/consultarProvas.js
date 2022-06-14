var prova = document.getElementById('prova');
var input = document.getElementById("nomeAluno"); 
var button = document.getElementById("buttonProva");
var requestURL = 'https://maxel-uds.github.io/JSON-Trabalho-TES/alunoAcademico.json';
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

function getProva() {
    prova.innerText = "";
    prova.style = "border: 1px solid black;"
    var ru = input.value;

    var dado = response.filter(dado => dado["ru"] == ru)[0];

    if(dado) {
        var tabela = document.createElement('table');
        
        createTitulo(tabela);
        createTable(tabela);

        dado["materias"].forEach(provas => {
            var materiaProva = provas["nome"];
            var proxProva = provas["proximaProva"];

            var linha = document.createElement('tr');
            var materia = document.createElement('td');
            var data = document.createElement('td');

            materia.textContent = materiaProva;
            data.textContent = proxProva;

            linha.appendChild(materia);
            linha.appendChild(data);
            tabela.appendChild(linha);
        });   
    } else {
        var par = document.createElement("p");
        par.id = "naoEncontrado";
        par.textContent = `Nenhum aluno foi encontrado com o RA: ${dado["ru"]}`;
        prova.appendChild(par);
    }
}

function createTitulo(tabela) {
    var linha = document.createElement('tr');
    var titulo = document.createElement('th');

    titulo.colSpan = 2;
    titulo.textContent = "Você tem provas nos seguintes dias: ";
    titulo.className = "titulo";
    
    linha.appendChild(titulo)
    tabela.appendChild(linha);
}

function createTable(tabela) {
    var linha = document.createElement('tr');
    var materia = document.createElement('th');
    var data = document.createElement('th');
    materia.textContent = `Matéria`;
    data.textContent = `Data`;
    linha.appendChild(materia);
    linha.appendChild(data);
    tabela.appendChild(linha);
    prova.appendChild(tabela);
}



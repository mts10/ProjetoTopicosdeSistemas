var extra = document.getElementById('extra');
var input = document.getElementById("ruAluno"); 
var form = document.getElementById("form"); 
var button = document.getElementById("buttonMatriculaAluno");
var requestURL = 'https://maxel-uds.github.io/JSON-Trabalho-TES/alunoMatricula.json';
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

function getMatriculaResponse() {
    extra.innerText = "";
    extra.style = "border: 1px solid black;"
    var ru = input.value;

    var dado = response.filter(dado => dado["ru"] == ru)[0];
    console.log(dado)

    if(dado) {
        var tabela = document.createElement('table');
        
        createTitulo(tabela);
        createTable(tabela);

        dado["atividadeExtra"].forEach(atividades => {
            var nomeAtividade = atividades["nome"];
            var codigoAtividade = atividades["codigo"];

            var linha = document.createElement('tr');
            var atividade = document.createElement('td');
            var codigo = document.createElement('td');

            atividade.textContent = nomeAtividade;
            codigo.textContent = codigoAtividade;

            linha.appendChild(atividade);
            linha.appendChild(codigo);
            tabela.appendChild(linha);

            
        }); 
        
        formMatricula.style = "display: none;"; 
        extra.appendChild(tabela); 

        var botao = document.createElement('button');
        botao.className = "matricularNovamente";
        botao.textContent = "Nova Matrícula";
        botao.setAttribute("onclick", "matricularNovamente()");
        extra.appendChild(botao);

    } else {
        var par = document.createElement("p");
        par.id = "naoEncontrado";
        par.textContent = `Nenhum aluno foi encontrado com o RA: ${dado["ru"]}`;
        extra.appendChild(par);
    }
}

function createTitulo(tabela) {
    var linha = document.createElement('tr');
    var titulo = document.createElement('th');

    titulo.colSpan = 2;
    titulo.textContent = "Matrícula feita com sucesso!";
    titulo.className = "titulo";
    
    linha.appendChild(titulo)
    tabela.appendChild(linha);
}

function createTable(tabela) {
    var linha = document.createElement('tr');
    var materia = document.createElement('th');
    var data = document.createElement('th');
    materia.textContent = `Matéria Matriculada`;
    data.textContent = `Código Matéria`;
    linha.appendChild(materia);
    linha.appendChild(data);
    tabela.appendChild(linha);
    extra.appendChild(tabela);
}

function matricularNovamente() {
    location.reload();
}



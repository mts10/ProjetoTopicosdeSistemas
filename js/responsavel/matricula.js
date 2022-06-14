var matriculaResponse = document.getElementById('matriculaResponse');
var button = document.getElementById('button');
var form = document.getElementById('form');
var nomeAluno = document.getElementById('nomeAluno');
var docAluno = document.getElementById('docAluno');
var idade = document.getElementById('idade');
var nomeMae = document.getElementById('nomeMae');
var docMae = document.getElementById('docMae');
var requestURL = 'https://maxel-uds.github.io/JSON-Trabalho-TES/alunoMatricula.json';
var request = new XMLHttpRequest();
var response;

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    response = request.response[0];
}

button.addEventListener("click", function(e) {  
    e.preventDefault();
});

function getMatriculaResponse() {
    matriculaResponse.innerText = "";
    matriculaResponse.style = "border: 3px solid green;";

    var tituloMatricula = document.createElement('h3');
    tituloMatricula.textContent = "Matrícula Realizada Com Sucesso!";
    tituloMatricula.className = "tituloMatricula";
    matriculaResponse.appendChild(tituloMatricula);

    var registro = document.createElement('p');
    registro.textContent = `Registro Acadêmico: ${response["ru"]}`;
    matriculaResponse.appendChild(registro);

    var nome = document.createElement('p');
    nome.textContent = `Nome do Aluno: ${response["nome"]}`;
    matriculaResponse.appendChild(nome);

    var nascimento = document.createElement('p');
    nascimento.textContent = `Nascimento: ${response["nascimento"]}`;
    matriculaResponse.appendChild(nascimento);

    var rg = document.createElement('p');
    rg.textContent = `Documento: ${response["documento"]["documento"]}`;
    matriculaResponse.appendChild(rg);

    var responsavel = document.createElement('p');
    responsavel.textContent = `Resposável: ${response["nomeMae"]}`;
    matriculaResponse.appendChild(responsavel);

    var responsavelDoc = document.createElement('p');
    responsavelDoc.textContent = `Documento do resposável: ${response["documentoMae"]}`;
    matriculaResponse.appendChild(responsavelDoc);

    var sexo = document.createElement('p');
    sexo.textContent = `Gênero: ${response["sexo"]}`;
    matriculaResponse.appendChild(sexo);

    var serie = document.createElement('p');
    serie.textContent = `Série: ${response["serie"]}`;
    matriculaResponse.appendChild(serie);

    var sede = document.createElement('p');
    sede.textContent = `Série: ${response["sede"]}`;
    matriculaResponse.appendChild(sede);

    var tabela = createTable(createTitulo());

    response["atividadeExtra"].forEach(atividade => {
        var nomeAtv = atividade["nome"];
        var codAtv = atividade["codigo"];

        var linha = document.createElement('tr');
        var nome = document.createElement('td');
        var codigo = document.createElement('td');
                    
        nome.textContent = nomeAtv;
        codigo.textContent = codAtv;

        linha.appendChild(nome);
        linha.appendChild(codigo);
        tabela.appendChild(linha);
    });

    form.style = "display: none;";    
    matriculaResponse.appendChild(tabela);

    var botao = document.createElement('button');
    botao.className = "matricularNovamente";
    botao.textContent = "Nova Matrícula";
    botao.setAttribute("onclick", "matricularNovamente()");
    matriculaResponse.appendChild(botao);
}

function createTable(tabela) {
    var linha = document.createElement('tr');
    var nome = document.createElement('th');
    var codigo = document.createElement('th');
    nome.textContent = `Nome`;
    codigo.textContent = `Código`;
    linha.appendChild(nome);
    linha.appendChild(codigo);
    tabela.appendChild(linha);

    return tabela;
}

function createTitulo() {
    var tabela = document.createElement('table');
    var linha = document.createElement('tr');
    var titulo = document.createElement('th');

    titulo.colSpan = 2;
    titulo.textContent = "Atividades Matriculado (a)";
    titulo.className = "titulo";
    
    linha.appendChild(titulo);
    tabela.appendChild(linha);

    return tabela;
}

function matricularNovamente() {
    location.reload();
}

function checkValue() {
    if(!nomeAluno.value || !idade.value || !nomeMae.value || conferirDoc()) {
        button.setAttribute("disabled", "disabled");
    } else {
        button.removeAttribute("disabled");
    }
}

function conferirDoc() {
    return (docAluno.value.length != 9 && docAluno.value.length != 11) || docMae.value.length != 11;
}
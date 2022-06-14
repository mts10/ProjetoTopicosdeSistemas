var matricula = document.getElementById('matricula');
var input = document.getElementById("ra"); 
var button = document.getElementById("button");
var requestURL = 'https://maxel-uds.github.io/JSON-Trabalho-TES/alunoMatricula.json';
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

function getMatricula() {
    matricula.innerText = "";
    matricula.style = "border: 1px solid black;";
    
    var ru = input.value;

    var dado = response.filter(dado => dado["ru"] == ru)[0];

    if(dado) {
        var registro = document.createElement('p');
        registro.textContent = `Registro Acadêmico: ${dado["ru"]}`;
        matricula.appendChild(registro);

        var nome = document.createElement('p');
        nome.textContent = `Nome do Aluno: ${dado["nome"]}`;
        matricula.appendChild(nome);

        var nascimento = document.createElement('p');
        nascimento.textContent = `Nascimento: ${dado["nascimento"]}`;
        matricula.appendChild(nascimento);

        var rg = document.createElement('p');
        rg.textContent = `Documento: ${dado["documento"]["documento"]}`;
        matricula.appendChild(rg);

        var responsavel = document.createElement('p');
        responsavel.textContent = `Resposável: ${dado["nomeMae"]}`;
        matricula.appendChild(responsavel);

        var responsavelDoc = document.createElement('p');
        responsavelDoc.textContent = `Documento do resposável: ${dado["documentoMae"]}`;
        matricula.appendChild(responsavelDoc);

        var sexo = document.createElement('p');
        sexo.textContent = `Gênero: ${dado["sexo"]}`;
        matricula.appendChild(sexo);

        var serie = document.createElement('p');
        serie.textContent = `Série: ${dado["serie"]}`;
        matricula.appendChild(serie);

        var sede = document.createElement('p');
        sede.textContent = `Série: ${dado["sede"]}`;
        matricula.appendChild(sede);

        var tabela = document.createElement('table');
        createTitulo(tabela);
        createTable(tabela);

        dado["atividadeExtra"].forEach(atividade => {
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
    } else {
        var par = document.createElement("p");
        par.id = "naoEncontrado";
        par.textContent = `Nenhum aluno foi encontrado com o RA: ${ru}`;
        matricula.appendChild(par);
    }
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
    matricula.appendChild(tabela);
}

function createTitulo(tabela) {
    var linha = document.createElement('tr');
    var titulo = document.createElement('th');

    titulo.colSpan = 2;
    titulo.textContent = "Atividades Matriculado (a)";
    titulo.className = "titulo";
    
    linha.appendChild(titulo)
    tabela.appendChild(linha);
}

function checkValue() {
    var ru = input.value;

    if(!ru || ru < 1) {
        button.setAttribute("disabled", "disabled");
    } else {
        button.removeAttribute("disabled");
    }
}
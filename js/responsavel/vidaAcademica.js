var informacoes = document.getElementById('informacoes');
var input = document.getElementById('input');
var button = document.getElementById("button");
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

function getInfoAcademicas() {
    informacoes.innerText = "";
    informacoes.style = "border: 1px solid black;";

    var ru = input.value;
    var infoAcademicas = response.filter(aluno => aluno["ru"] == ru)[0];
    
    if(infoAcademicas) {
        var nomeAluno = document.createElement("p");
        nomeAluno.textContent = `Nome do Aluno: ${infoAcademicas["nome"]}`;
        informacoes.appendChild(nomeAluno);

        var nascimentoAluno = document.createElement("p");
        nascimentoAluno.textContent = `Data de Nascimento: ${infoAcademicas["nascimento"]}`;
        informacoes.appendChild(nascimentoAluno);

        var tabelaAtividadeExtra = createTableAtividadeExtra(createTituloTabela("Atividades Matrículado (a)", 2));
        infoAcademicas["atividadeExtra"].forEach(atividade => {
            var nomeAtv = atividade["nome"];
            var idAtv = atividade["id"];

            var linha = document.createElement('tr');
            var nome = document.createElement('td');
            var id = document.createElement('td');
                            
            nome.textContent = nomeAtv;
            id.textContent = idAtv;

            linha.appendChild(id);
            linha.appendChild(nome);
            tabelaAtividadeExtra.appendChild(linha);
        });
        
        informacoes.appendChild(tabelaAtividadeExtra);

        var tabelaInfoMaterias = createTableInfoMaterias(createTituloTabela("Informação por Disciplina", 5));
        infoAcademicas["materias"].forEach(materia => {
            var cod = materia["materiaId"];
            var nomeMat = materia["nome"];
            var notaMat = materia["nota"];
            var faltasMat = materia["faltas"];
            var avaliacao = materia["proximaProva"];

            var linha = document.createElement('tr');
            var codigo = document.createElement('td');
            var nome = document.createElement('td');
            var nota = document.createElement('td');
            var faltas = document.createElement('td');
            var proximaAva = document.createElement('td');
            
            codigo.textContent = cod;
            nome.textContent = nomeMat;
            nota.textContent = notaMat;
            faltas.textContent = faltasMat;
            proximaAva.textContent = avaliacao;
            
            linha.appendChild(codigo);
            linha.appendChild(nome);
            linha.appendChild(nota);
            linha.appendChild(faltas);
            linha.appendChild(proximaAva);
            tabelaInfoMaterias.appendChild(linha);
        });

        informacoes.appendChild(tabelaInfoMaterias);
    } else {
        var par = document.createElement("p");
        par.id = "naoEncontrado";
        par.textContent = `Nenhum aluno foi encontrado com o RA: ${ru}`;
        informacoes.appendChild(par);
    }
}

function createTituloTabela(tituloTabela, colunas) {
    var tabela = document.createElement('table');
    var linha = document.createElement('tr');
    var titulo = document.createElement('th');

    titulo.colSpan = colunas;
    titulo.textContent = tituloTabela;

    tabela.className = "tabelaInfo";
    titulo.className = "titulo";
    
    linha.appendChild(titulo)
    tabela.appendChild(linha);

    return tabela;
}

function createTableAtividadeExtra(tabela) {
    var linha = document.createElement('tr');
    var nome = document.createElement('th');
    var codigo = document.createElement('th');
    
    nome.textContent = `Atividade`;
    codigo.textContent = `Código`;
    
    linha.appendChild(codigo);
    linha.appendChild(nome);
    tabela.appendChild(linha);
    
    return tabela;
}

function createTableInfoMaterias(tabela) {
    var linha = document.createElement('tr');
    var codigo = document.createElement('th');
    var nome = document.createElement('th');
    var nota = document.createElement('th');
    var faltas = document.createElement('th');
    var proximaAva = document.createElement('th');
    
    codigo.textContent = "Código";
    nome.textContent = "Atividade";
    nota.textContent = "Nota";
    faltas.textContent = "Faltas";
    proximaAva.textContent = "Próxima Avaliação";
    
    linha.appendChild(codigo);
    linha.appendChild(nome);
    linha.appendChild(nota);
    linha.appendChild(faltas);
    linha.appendChild(proximaAva);
    tabela.appendChild(linha);
    
    return tabela;
}

function checkValue() {
    var ru = input.value;

    if(!ru || ru < 1) {
        button.setAttribute("disabled", "disabled");
    } else {
        button.removeAttribute("disabled");
    }
}
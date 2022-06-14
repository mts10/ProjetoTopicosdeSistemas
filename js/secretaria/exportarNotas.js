var notas = document.getElementById('notasTurma');
var checkbox = document.getElementsByName('turno');
var select = document.getElementById('select');
var button = document.getElementById("button");
var requestURL = 'https://maxel-uds.github.io/JSON-Trabalho-TES/exportarNotas.json';
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
    notas.innerText = "";
    notas.style = "border: 1px solid black;";

    var serie = select.value;
    var turno = getTurnoId();

    var turma = response.filter(turma => turma["turno"]["cod"] == turno && turma["serie"] == serie)[0];

    if(turma) {
        var horario = document.createElement("p");
        horario.textContent = `Turno: ${turma["turno"]["nome"]}`;
        notas.appendChild(horario);

        var ano = document.createElement("p");
        ano.textContent = `Série: ${turma["serie"]}ª série`;
        notas.appendChild(ano);

        turma["alunos"].forEach(aluno => {
            var tabela = createTituloTabela(aluno);

            aluno["materias"].forEach(materia => {
                var nomeMat = materia["nome"];
                var notaMat = materia["nota"];

                var linha = document.createElement('tr');
                var nome = document.createElement('td');
                var nota = document.createElement('td');
                        
                nome.textContent = nomeMat;
                nota.textContent = notaMat;

                linha.appendChild(nome);
                linha.appendChild(nota);
                tabela.appendChild(linha);
            });

            notas.appendChild(tabela);
        });
    } else {
        var par = document.createElement("p");
        par.id = "naoEncontrado";
        par.textContent = `Nenhuma turma da ${serie}ª série foi encontrada no turno da ${turno == 1 ? "manhã" : "tarde"}`;
        notas.appendChild(par);
    }
}

function getTurnoId() {
    if(checkbox[0].checked) {
        return checkbox[0].value;
    } else {
        return checkbox[1].value;
    }
}

function createTituloTabela(aluno) {
    var tabela = document.createElement('table');
    var linha = document.createElement('tr');
    var titulo = document.createElement('th');

    titulo.colSpan = 2;
    titulo.textContent = `${aluno["nome"]} - RA: ${aluno["ru"]}`;
    titulo.className = "titulo";
    
    linha.appendChild(titulo)
    tabela.appendChild(linha);

    tabela.className = "tabelaNotas";

    return createTable(tabela);
}

function createTable(tabela) {
    var linha = document.createElement('tr');
    var nome = document.createElement('th');
    var nota = document.createElement('th');
    
    nome.textContent = `Matéria`;
    nota.textContent = `Nota`;
    
    linha.appendChild(nome);
    linha.appendChild(nota);
    tabela.appendChild(linha);
    
    return tabela;
}
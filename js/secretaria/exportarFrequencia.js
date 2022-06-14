var frequenciaTurma = document.getElementById('frequenciaTurma');
var checkbox = document.getElementsByName('turno');
var select = document.getElementById('select');
var button = document.getElementById("button");
var requestURL = 'https://maxel-uds.github.io/JSON-Trabalho-TES/exportarFrequencia.json';
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

function getFrequencia() {
    frequenciaTurma.innerText = "";
    frequenciaTurma.style = "border: 1px solid black;";

    var serie = select.value;
    var turno = getTurnoId();

    var turma = response.filter(turma => turma["turno"]["cod"] == turno && turma["serie"] == serie)[0];

    if(turma) {
        var horario = document.createElement("p");
        horario.textContent = `Turno: ${turma["turno"]["nome"]}`;
        frequenciaTurma.appendChild(horario);

        var ano = document.createElement("p");
        ano.textContent = `Série: ${turma["serie"]}ª série`;
        frequenciaTurma.appendChild(ano);

        turma["alunos"].forEach(aluno => {
            var tabela = createTituloTabela(aluno);

            aluno["materias"].forEach(materia => {
                var nomeMat = materia["nome"];
                var faltasMat = materia["faltas"];

                var linha = document.createElement('tr');
                var nome = document.createElement('td');
                var faltas = document.createElement('td');
                        
                nome.textContent = nomeMat;
                faltas.textContent = faltasMat;

                linha.appendChild(nome);
                linha.appendChild(faltas);
                tabela.appendChild(linha);
            });

            frequenciaTurma.appendChild(tabela);
        });
    } else {
        var par = document.createElement("p");
        par.id = "naoEncontrado";
        par.textContent = `Nenhuma turma da ${serie}ª série foi encontrada no turno da ${turno == 1 ? "manhã" : "tarde"}`;
        frequenciaTurma.appendChild(par);
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

    tabela.className = "tabelaFrequencia";

    return createTable(tabela);
}

function createTable(tabela) {
    var linha = document.createElement('tr');
    var nome = document.createElement('th');
    var faltas = document.createElement('th');
    
    nome.textContent = `Matéria`;
    faltas.textContent = `Faltas`;

    linha.appendChild(nome);
    linha.appendChild(faltas);
    tabela.appendChild(linha);
    
    return tabela;
}
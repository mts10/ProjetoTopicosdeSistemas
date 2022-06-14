var atividade = document.getElementById('atividade');
var input = document.getElementById("nomeAluno"); 
var button = document.getElementById("buttonAtividade");
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

function getAtividades() {
    atividade.innerText = "";
    atividade.style = "border: 1px solid black;"
    var ru = input.value;

    var dado = response.filter(dado => dado["ru"] == ru)[0];

    if(dado) {
        var tabela = document.createElement('table');
        
        createTable(tabela);

        dado["atividadeExtra"].forEach(atividades => {
            var atvdNome = atividades["nome"];

            var linha = document.createElement('tr');
            var atividadeExtra = document.createElement('td');

            atividadeExtra.textContent = atvdNome;

            linha.appendChild(atividadeExtra);
            tabela.appendChild(linha);
        });   
    } else {
        var par = document.createElement("p");
        par.id = "naoEncontrado";
        par.textContent = `Nenhum aluno foi encontrado com o RA: ${dado["ru"]}`;
        atividade.appendChild(par);
    }
}

function createTable(tabela) {
    var linha = document.createElement('tr');
    var atividadeExtra = document.createElement('th');
    atividadeExtra.textContent = `Você está matriculado nas seguintes atividades: `;
    linha.appendChild(atividadeExtra);
    tabela.appendChild(linha);
    atividade.appendChild(tabela);
}
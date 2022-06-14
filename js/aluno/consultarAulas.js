var aulas = document.getElementById('aulas');
var input = document.getElementById("nomeAluno"); 
var button = document.getElementById("buttonAulas");
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

function getAulas() {
    aulas.innerText = "";
    aulas.style = "border: 1px solid black;"
    var ru = input.value;

    var dado = response.filter(dado => dado["ru"] == ru)[0];

    if(dado) {
        var datas = document.createElement('p');
        datas.textContent = `Você tem aulas nos dias: ${dado[""]}`;
        aulas.appendChild(datas);

        
    } else {
        var par = document.createElement("p");
        par.id = "naoEncontrado";
        par.textContent = `Nenhum aluno foi encontrado com o nome: ${dado["nome"]}`;
        aulas.appendChild(par);
    }
}



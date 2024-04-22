const inputTarefa = document.querySelector('.input-tarefa');

const btnTarefa = document.querySelector('.btn-tarefa');

const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {
    
    if (e.keyCode === 13) {
        
        if (!inputTarefa.value) return;

        criaTarefa(inputTarefa.value);
    }
});

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += ' '; 
    const botaoApagar = document.createElement('button'); 
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('apagar')) {
        const li = el.parentElement;
        li.remove();
        salvarTarefas();
    }
});

// Esta função salva as tarefas na memória local do navegador
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    // Converte a lista de tarefas para JSON e a armazena no armazenamento local
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

// Esta função adiciona as tarefas salvas anteriormente ao carregar a página
function adicionaTarefasSalvas() {
    // Obtém as tarefas salvas do armazenamento local do navegador
    const tarefas = localStorage.getItem('tarefas');
    // Converte as tarefas de formato JSON para um array JavaScript
    const listaDeTarefas = JSON.parse(tarefas);

    // Itera sobre cada tarefa na lista de tarefas recuperadas
    for (let tarefa of listaDeTarefas) {
        // Para cada tarefa, chama a função criaTarefa para criar e adicionar a tarefa à lista de tarefas na página
        criaTarefa(tarefa);
    }
}

// Chama a função adicionaTarefasSalvas para adicionar as tarefas salvas à página quando o script é carregado
adicionaTarefasSalvas();

const tabelaSug = document.getElementById("tabelasug").querySelector("tbody");

const sugestoes = JSON.parse(localStorage.getItem("sugestoes")) || [];

function atualizarTabela() {
    tabelaSug.innerHTML = ""; 

    sugestoes.forEach((sugestao, index) => {
        const novaLinha = document.createElement("tr");

        const colunaNome = document.createElement("td");
        colunaNome.textContent = sugestao;

        const colunaBotao = document.createElement("td");
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener("click", () => {
            removerItem(index); 
        });
        colunaBotao.appendChild(botaoRemover);

        novaLinha.appendChild(colunaNome);
        novaLinha.appendChild(colunaBotao);

        tabelaSug.appendChild(novaLinha);
    });
}

function removerItem(index) {
    sugestoes.splice(index, 1); 
    localStorage.setItem("sugestoes", JSON.stringify(sugestoes)); 
    atualizarTabela(); 
}

atualizarTabela();

let login = sessionStorage.getItem('usuarioLogado');

if(!login) window.location.href = "../index.html";

let usuario = sessionStorage.getItem('nomeUsuario');

document.getElementById('logout').addEventListener('click', (evento) => {
    evento.preventDefault();
    sessionStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('nomeUsuario');
    window.location.href = "../index.html";
});
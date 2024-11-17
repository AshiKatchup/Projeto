const tabelaIns = document.getElementById("tabelains").querySelector("tbody");

const emails = JSON.parse(localStorage.getItem("emails")) || [];

function atualizarTabela() {
    tabelaIns.innerHTML = ""; 

    emails.forEach((email, index) => {
        const novaLinha = document.createElement("tr");


        const colunaEmail = document.createElement("td");
        colunaEmail.textContent = email;


        const colunaBotao = document.createElement("td");
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener("click", () => {
            removerItem(index); 
        });
        colunaBotao.appendChild(botaoRemover);


        novaLinha.appendChild(colunaEmail);
        novaLinha.appendChild(colunaBotao);


        tabelaIns.appendChild(novaLinha);
    });
}


function removerItem(index) {
    emails.splice(index, 1); 
    localStorage.setItem("emails", JSON.stringify(emails)); 
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
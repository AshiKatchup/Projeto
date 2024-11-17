

function carregarTabela() {
    const dados = JSON.parse(localStorage.getItem('dados')) || [];
    const tabela = document.querySelector('#tabela tbody');

    tabela.innerHTML = '';

    dados.forEach((produto) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nomeFilme}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco}</td>
        `;
        tabela.appendChild(linha);
    });
}

window.onload = carregarTabela;

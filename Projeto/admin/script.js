let dados = JSON.parse(localStorage.getItem('dados')) || [];
let nomeFilme = document.getElementById('nomeFilme');
let quantidade = document.getElementById('quantidade');
let preco = document.getElementById('preco');

const key = new URLSearchParams(window.location.search).get('chave');

if (key) {
    nomeFilme.value = dados[key].nomeFilme;
    quantidade.value = dados[key].quantidade;
    preco.value = dados[key].preco;
    document.querySelector('#formFilme button[type="submit"]').innerText = "Alterar";
}

document.getElementById('formFilme').addEventListener('reset', function (e) {
    e.preventDefault();
    window.location.href = "./admin.html";
});

document.getElementById('formFilme').addEventListener('submit', function (e) {
   e.preventDefault();

   removerMensagensErro();

    let validade = true;

    if (!nomeFilme.value) {
        exibirErro('nomeFilme', 'Nome é obrigatório');
        validade = false;
    }

    if (!quantidade.value || isNaN(quantidade.value)) {
        exibirErro('quantidade', 'Quantidade inválida');
        validade = false;
    }


    let precoValidado = validarValorMonetario(preco.value);
    if (!precoValidado || isNaN(precoValidado)) {
        console.log(precoValidado);
        exibirErro('preco', 'Preço inválido');
        validado = false;
    }

    if (!validade) {
        return;
    }

    const produto = {
        nomeFilme: nomeFilme.value,
        quantidade: quantidade.value,
        preco: preco.value
    };

    if (key) {
        dados[key] = produto;
    } else {
        dados.push(produto);
    }

    localStorage.setItem('dados', JSON.stringify(dados));

    console.log('Dados salvos:', dados);

    atualizarTabela();

    window.location.href = "./admin.html";
});

function validarValorMonetario(valor){
    valor = valor.replaceAll("R", "").replaceAll("$", "").replaceAll(" ", "");
    if (valor.includes(",")) {
        valor = valor.replaceAll(".", "");
        valor = valor.replace(",", ".");
    }
    console.log(valor);
    return Number(valor);
}

function exibirErro(campoId, mensagem) {
    const campo = document.getElementById(campoId);
    const erro = document.createElement('p');
    erro.classList.add('erro');
    erro.innerText = mensagem;
    campo.after(erro);
}

function removerMensagensErro() {
    const erros = document.querySelectorAll('.erro');
    erros.forEach(erro => erro.remove());
}

function atualizarTabela() {
    const tabela = document.querySelector('#tabela tbody');
    tabela.innerHTML = '';


    dados.forEach((produto, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nomeFilme}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco}</td>
            <td>
                <a href="?chave=${index}">Editar</a>
                <a href="#" onclick="removerProduto(${index})">Excluir</a>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

function removerProduto(index) {
    dados.splice(index, 1); 
    localStorage.setItem('dados', JSON.stringify(dados)); 
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

function atualizarTabela() {
    const tabela = document.querySelector('#tabela tbody');
    tabela.innerHTML = '';

    dados.forEach((produto, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nomeFilme}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco}</td>
            <td>
                <a href="?chave=${index}">Editar</a>
                <a href="#" onclick="removerProduto(${index})">Excluir</a>
            </td>
        `;
        tabela.appendChild(linha);
    });
}
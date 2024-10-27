//Recuperação dos dados
let dados = JSON.parse(localStorage.getItem('dados')) || [];
let nomeFilme = document.getElementById('nomeFilme');
let quantidade = document.getElementById('quantidade');
let preco = document.getElementById('preco');

//Verifica se a chave "chave" existe na URL para edição
const key = new URLSearchParams(window.location.search).get('chave');

//Preenche o formulário caso seja uma edição
if (key) {
    nomeFilme.value = dados[key].nomeFilme;
    quantidade.value = dados[key].quantidade;
    preco.value = dados[key].preco;
    document.querySelector('#formFilme button[type="submit"]').innerText = "Alterar";
}

//Resetar o formulário e redirecionar para a página principal
document.getElementById('formFilme').addEventListener('reset', function (e) {
    e.preventDefault();
    window.location.href = "./admin.html";
});

//Submissão do formulário
document.getElementById('formFilme').addEventListener('submit', function (e) {
   e.preventDefault();



    let validade = true;

    //Validações do formulário
    if (!nomeFilme.value) {
        exibirErro('nomeFilme', 'Nome é obrigatório');
        validade = false;
    }

    if (!quantidade.value || isNaN(quantidade.value)) {
        exibirErro('quantidade', 'Quantidade inválida');
        validade = false;
    }

    if (!preco.value || isNaN(preco.value)) {
        exibirErro('preco', 'Preço inválido');
        validade = false;
    }

    if (!validade) {
        return;
    }

    //Cria o objeto produto com os valores do formulário
    const produto = {
        nomeFilme: nomeFilme.value,
        quantidade: quantidade.value,
        preco: preco.value
    };

    //Se for uma edição, atualiza o produto, caso contrário, adiciona
    if (key) {
        dados[key] = produto;
    } else {
        dados.push(produto);
    }

    //Salva os dados no localStorage
    localStorage.setItem('dados', JSON.stringify(dados));

    //Verificação de debug para checar o array de dados
    console.log('Dados salvos:', dados);

    //Atualiza a tabela com os novos dados
    atualizarTabela();

    //Redireciona para a página de administração
    window.location.href = "./admin.html";
});

//Função para atualizar a tabela
function atualizarTabela() {
    const tabela = document.querySelector('#tabela tbody');
    tabela.innerHTML = '';

    //Preenche a tabela
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

//Função para remover um produto da tabela e do localStorage
function removerProduto(index) {
    dados.splice(index, 1); //Remove o produto do array de dados
    localStorage.setItem('dados', JSON.stringify(dados)); //Atualiza o localStorage
    atualizarTabela(); //Atualiza a tabela
}

//Inicializa a tabela ao carregar a página
atualizarTabela();


//Verificando usuario
let login = sessionStorage.getItem('usuarioLogado');

if(!login) window.location.href = "../index.html";

let usuario = sessionStorage.getItem('nomeUsuario');

// Fazendo o logout
document.getElementById('logout').addEventListener('click', (evento) => {
    evento.preventDefault();
    sessionStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('nomeUsuario');
    window.location.href = "../index.html";
});
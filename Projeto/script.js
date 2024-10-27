const menu = document.querySelectorAll('nav a');

menu.forEach(link => {
    link.addEventListener('click', evento => {
        const href = link.getAttribute('href');

        //Catalogo funciona normal
        if (href === "catalogo.html") {
            return; 
        }

        evento.preventDefault(); 
        const alvo = document.querySelector(href);

  
        if (alvo) {
            window.scroll({
                top: alvo.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});


//Login

//Janela de login
const btnLogin = document.getElementById('btnLogin');
const btnFechar = document.getElementById('btnFechar');

btnLogin.onclick = function(){
    login.showModal();
}

btnFechar.onclick = function(){
    login.close();
}

const login = document.getElementById('login');
const formLogin = document.querySelector('#login form');

//Usuario
let dadosUsuarios = [
    { nome: "admin", email: "admin@email.com", senha: "admin" },

];

formLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    //Verificar usuario
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    dadosUsuarios.forEach(item =>{
        if(email === item.email && senha === item.senha){
            // Criando sessões para armazenar informações
            sessionStorage.setItem('usuarioLogado', 'true');
            sessionStorage.setItem('nomeUsuario', item.nome);

            window.location.href="./admin/admin.html";
        }
    });
    

    //Erro
    let usuarioLogado = sessionStorage.getItem('usuarioLogado');

    if(!usuarioLogado){        
        erro = document.createElement('p');
        erro.classList.add('erro');
        erro.innerText = 'Login ou senha inválido';
        login.insertBefore(erro, login.firstChild);
        document.querySelector('#login form').reset();
    }
});




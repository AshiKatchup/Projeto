const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        if (link.getAttribute('href') === '#login') {
            event.preventDefault(); 
            const loginDialog = document.getElementById('login');
            loginDialog.showModal(); 
        }
        else if (link.getAttribute('href') === 'catalogo.html') {
            return; 
        } else {
            event.preventDefault(); 
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId); 
            
            targetElement.scrollIntoView({
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});






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

let dadosUsuarios = [
    { nome: "admin", email: "admin@email.com", senha: "admin" },

];

formLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    dadosUsuarios.forEach(item =>{
        if(email === item.email && senha === item.senha){
            sessionStorage.setItem('usuarioLogado', 'true');
            sessionStorage.setItem('nomeUsuario', item.nome);

            window.location.href="./admin/admin.html";
        }
    });
    

    let usuarioLogado = sessionStorage.getItem('usuarioLogado');

    if(!usuarioLogado){        
        erro = document.createElement('p');
        erro.classList.add('erro');
        erro.innerText = 'Login ou senha inválido';
        login.insertBefore(erro, login.firstChild);
        document.querySelector('#login form').reset();
    }
});

function trocarImagens(event) {
    const imagemClicada = event.target;

    const imagemGrande = document.querySelector('.grid img');
    const imagensPequenas = document.querySelectorAll('.pequena img');

    if (imagemClicada !== imagemGrande) {
        imagemGrande.style.opacity = 0;
        imagemClicada.style.opacity = 0;

        setTimeout(() => {
            const imagemTemp = imagemGrande.src;

            imagemGrande.src = imagemClicada.src;
            imagemGrande.alt = imagemClicada.alt;
            imagemGrande.id = imagemClicada.id;

            imagemClicada.src = imagemTemp;
            imagemClicada.alt = 'nova imagem';

            imagemGrande.style.opacity = 1;
            imagemClicada.style.opacity = 1;
        }, 500); 
    }
}

document.querySelectorAll('.pequena img').forEach(imagem => {
    imagem.addEventListener('click', trocarImagens);
});










    








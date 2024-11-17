const formIns = document.getElementById("formE");
const emailInput = document.getElementById("insemail");

function exibirErro(mensagem) {
    alert(mensagem); 
}

function validarEmail(email) {
    const emailPartes = email.split('@'); 


    if (emailPartes.length !== 2 || !emailPartes[1].includes('.') || emailPartes[0] === '' || emailPartes[1].split('.')[0] === '') {
        exibirErro('Email inválido'); 
        return false; 
    }

    return true; 
}


formIns.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const email = emailInput.value.trim(); 

    if (email && validarEmail(email)) {
        const emails = JSON.parse(localStorage.getItem("emails")) || [];
        emails.push(email); 
        localStorage.setItem("emails", JSON.stringify(emails)); 

        alert("Inscrição realizada com sucesso!"); 
        emailInput.value = ""; 
    } 
});





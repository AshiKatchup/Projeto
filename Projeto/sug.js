const formSug = document.getElementById("formsug");
const sugNome = document.getElementById("sugnome");


formSug.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const nomeFilme = sugNome.value.trim(); 

    if (nomeFilme) {
        const sugestoes = JSON.parse(localStorage.getItem("sugestoes")) || [];
        sugestoes.push(nomeFilme); 
        localStorage.setItem("sugestoes", JSON.stringify(sugestoes)); 

        alert("Sugestão adicionada com sucesso!"); 
        sugNome.value = ""; 
    } else {
        alert("Por favor, insira o nome de um filme.");
    }
});

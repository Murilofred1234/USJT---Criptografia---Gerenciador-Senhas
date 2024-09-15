const usuarioArray = JSON.parse(localStorage.getItem('Usuarios')) || [];

const nameForm = document.querySelector("#name-form");

nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const usuario = document.querySelector("#user")
    const senha = document.querySelector("#senha")
    const nota = document.querySelector("#nota")      
    
    
    const novo = {
        user: usuario.value,
        senha: senha.value,
        nota: nota.value,
        
    };

    usuarioArray.push(novo);

    localStorage.setItem("Usuarios", JSON.stringify(usuarioArray));

    usuario.value = ''
    senha.value = ''
    nota.value = ''

    console.log('Array atualizado:', usuarioArray);
    

});




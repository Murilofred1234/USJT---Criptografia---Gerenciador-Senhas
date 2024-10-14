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

    if(novo.user === '' || novo.senha === ''){

    }else{
        alert('Senha adicioanda com sucesso!')
    }

    usuarioArray.push(novo);

    localStorage.setItem("Usuarios", JSON.stringify(usuarioArray));

    usuario.value = ''
    senha.value = ''
    nota.value = ''
});

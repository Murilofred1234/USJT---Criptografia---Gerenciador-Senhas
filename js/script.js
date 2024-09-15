let usuarioArray = JSON.parse(localStorage.getItem('Usuarios')) || [];


console.log()

function ColocarSenha() {    
    usuarioArray.forEach(function(Usuario) {
       
        

        const containerBloco = document.createElement('div');
        containerBloco.classList.add('container__bloco')
        document.body.appendChild(containerBloco)
        


        const Bloco = document.createElement('div');
        Bloco.classList.add('bloco');
        containerBloco.appendChild(Bloco);

        const nomeUsuario = document.createElement('span');
        nomeUsuario.classList.add('text-usuario');
        Bloco.appendChild(nomeUsuario);
        nomeUsuario.innerHTML = `Nome Usuário: ${Usuario.user}`

        const senhaUsuario = document.createElement('span');
        senhaUsuario.classList.add('text-senha');
        Bloco.appendChild(senhaUsuario);
        senhaUsuario.innerHTML = `Senha: ${Usuario.senha}`

        const notaUsuario = document.createElement('span');
        notaUsuario.classList.add('text-nota');
        Bloco.appendChild(notaUsuario);
        notaUsuario.innerHTML =  ` ${Usuario.nota ? `Nota: ${Usuario.nota}` : "Sem nota" }`

        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botaoExcluir');
        Bloco.appendChild(botaoExcluir);
        botaoExcluir.innerHTML = 'Excluir'

        console.log(Usuario)

        botaoExcluir.addEventListener('click', () => {
            const indexAtual = usuarioArray.findIndex(usuario => usuario === Usuario);
            console.log(indexAtual)
            if (indexAtual !== -1) {
                usuarioArray.splice(indexAtual, 1);
            localStorage.setItem('Usuarios', JSON.stringify(usuarioArray));
            containerBloco.remove();
            
        }
   })     

   const botaoExcluirTudo = document.querySelector('.excluirTudo');

   botaoExcluirTudo.addEventListener('click', () => {
    usuarioArray.splice(0, usuarioArray.length);
    
    localStorage.setItem('Usuarios', JSON.stringify(usuarioArray));
    containerBloco.remove();
})
            

    })
}



ColocarSenha();
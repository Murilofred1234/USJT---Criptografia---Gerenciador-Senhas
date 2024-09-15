let usuarioArray = JSON.parse(localStorage.getItem('Usuarios')) || [];



function ColocarSenha() {    
    usuarioArray.forEach(function(item) {
       
        

        const containerBloco = document.createElement('div');
        containerBloco.classList.add('container__bloco')
        document.body.appendChild(containerBloco)
        


        const Bloco = document.createElement('div');
        Bloco.classList.add('bloco');
        containerBloco.appendChild(Bloco);

        const nomeUsuario = document.createElement('span');
        nomeUsuario.classList.add('text-usuario');
        Bloco.appendChild(nomeUsuario);
        nomeUsuario.innerHTML = `Nome Usuário: ${item.user}`

        const senhaUsuario = document.createElement('span');
        senhaUsuario.classList.add('text-senha');
        Bloco.appendChild(senhaUsuario);
        senhaUsuario.innerHTML = `Senha: ${item.senha}`

        const notaUsuario = document.createElement('span');
        notaUsuario.classList.add('text-nota');
        Bloco.appendChild(notaUsuario);
        notaUsuario.innerHTML =  ` ${item.nota ? `Nota: ${item.nota}` : "Sem nota" }`

        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botaoExcluir');
        Bloco.appendChild(botaoExcluir);
        botaoExcluir.innerHTML = 'Excluir'

        botaoExcluir.addEventListener('click', () => {
            const indexAtual = usuarioArray.findIndex(usuario => usuario === item);

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
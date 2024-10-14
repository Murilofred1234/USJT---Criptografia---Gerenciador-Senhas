let usuarioArray = JSON.parse(localStorage.getItem('Usuarios')) || [];

// verificando se o botão de excluir tudo deve ser exibido 
const botaoExcluirTudo = document.querySelector('.excluirTudo');
if(usuarioArray.length === 0){
    botaoExcluirTudo.style.display = 'none'
}


function ColocarSenha() {
    // iterando por todos os usuários do banco de dados
    usuarioArray.forEach(function(item) {
        // criando bloco do usuário i
        const containerBloco = document.createElement('div');
        containerBloco.classList.add('container__bloco')
        document.body.appendChild(containerBloco)       
        const Bloco = document.createElement('div');
        Bloco.classList.add('bloco');
        containerBloco.appendChild(Bloco);

        // exibindo nome do usuário i
        const nomeUsuario = document.createElement('span');
        nomeUsuario.classList.add('text-usuario');
        Bloco.appendChild(nomeUsuario);
        nomeUsuario.innerHTML = `Nome Usuário: ${item.user}`

        // exibindo senha do usuário i
        const senhaUsuario = document.createElement('span');
        senhaUsuario.classList.add('text-senha');
        Bloco.appendChild(senhaUsuario);
        senhaUsuario.innerHTML = `Senha: ${item.senha}`

        // exibindo nota do usuário i
        const notaUsuario = document.createElement('span');
        notaUsuario.classList.add('text-nota');
        Bloco.appendChild(notaUsuario);
        notaUsuario.innerHTML =  ` ${item.nota ? `Nota: ${item.nota}` : "Sem nota" }`

        // exibindo botão de excluir senha
        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botaoExcluir');
        Bloco.appendChild(botaoExcluir);
        botaoExcluir.innerHTML = 'Excluir'

        // adicionando eventListener para o click no botão de excluir 
        botaoExcluir.addEventListener('click', () => {
            // buscando index do usuário a ser excluído 
            const indexAtual = usuarioArray.findIndex(usuario => usuario === item);
            //verificando se index !== 0 
            if (indexAtual !== -1) {
                // removendo usuário do array 
                usuarioArray.splice(indexAtual, 1);
                // arrumando o banco de dados
                localStorage.setItem('Usuarios', JSON.stringify(usuarioArray));
                // removendo o bloco HTML do usuário excluído
                containerBloco.remove();
                // verificando se o botão de excluir tudo deve ser exibido 
                if(usuarioArray.length === 0){
                    botaoExcluirTudo.style.display = 'none'
                }
            }
        })     
        
        const botaoExcluirTudo = document.querySelector('.excluirTudo');
        // adicionando eventListener para o click no botão de excluir tudo
        botaoExcluirTudo.addEventListener('click', () => {
            // removendo todos os usuários do array
            usuarioArray.splice(0, usuarioArray.length);
            // removendo todos os usuários do banco de dados
            localStorage.setItem('Usuarios', JSON.stringify(usuarioArray));
            // removendo o bloco HTML do usuário excluído
            containerBloco.remove();
            // removendo botão de excluir tudo
            botaoExcluirTudo.style.display = 'none'
        })           
    })
}




ColocarSenha();
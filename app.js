// ----- IMPORTS -----
import express from 'express';
import { engine } from 'express-handlebars';
import * as mysql from 'mysql2'
import aesjs from 'aes-js';


function encrypt(text, key) {
    var textBytes = aesjs.utils.utf8.toBytes(text);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    
    return encryptedHex;
}

function decrypt(hex, key) {
    var encryptedBytes = aesjs.utils.hex.toBytes(hex);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

    return decryptedText;
}



// ----- SQL -----
// Criando conexão sql
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"projetocriptografia"
});
 // Conectando com servidor mySQL / Lançando possíveis erros
 conn.connect(function(erro){
    if(erro) throw erro;
    console.log("Conexão efetuada com sucesso!");
});



// ----- CONFIGURAÇÕES -----
// Definindo o usuário loggado
var usuarioLogado = 0;
var chaveUsuarioLogado;

// 
var chaveApp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

// Criando app com express
const app = express();
// Adicionando CSS
app.use("/css", express.static("./css"));
// Configurando express-handlebards
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");
// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));



// ----- ROTAS -----
// Rota principal
app.get('/', function(req, res){
    res.render('login');
});

// Rota de exibição das senhas do usuário
app.get("/index", function(req, res){ 
    var sql = `SELECT * FROM senhas WHERE id_usuario = ${usuarioLogado};`;

    conn.query(sql, function(erro, result){
        if (erro) throw erro;

        for(let i = 0; i < result.length; i++) {        
            result[i].senha = decrypt(result[i].senha, chaveUsuarioLogado);
        }

        // Renderiza a página 'index' passando os resultados da consulta
        res.render("index", {
            senhas: result // passa o resultado da query para o template
        });
    });
});

// Rota aba criação de senhas
app.get('/novaSenha', function(req, res){
    // render your contact.handlebars
    res.render("novaSenha");
});

// Rota de cadastro de usuário
app.get('/cadastro', function(req, res){
    res.render('cadastro');
});



// ----- AÇÕES -----
app.post("/login", function(req, res){
    // Buscando dados do formulário html
    var usuario = req.body.usuario;
    var senha = req.body.senha;

    var sql = `SELECT * FROM usuarios WHERE usuario = "${usuario}"`;
    conn.query(sql, function(erro, result){
        if(erro) throw erro;
        if(result.length == 0) {
            console.log("Usuário não encontrado");
            res.redirect('/');
        } else {
            if(decrypt(result[0].senha, chaveApp) == senha) {
                usuarioLogado = result[0].id_usuario;
                chaveUsuarioLogado = result[0].chave.split(',').map(Number);
                console.log(`Usuário ${result[0].usuario} logou`);
                res.redirect('/index');
            }
            else {
                console.log("Usuário ou senha incorretos");
                res.redirect('/');
            }
        }

    });
});

// Ação de logout
app.post('/logout', function(req, res) {
    res.redirect('/');
    usuarioLogado = 0;
});

// Ação de cadastro de usuário
app.post("/cadastrar", function(req, res) {
    var usuario = req.body.usuario;
    var senha = req.body.senha;

    var chave = [];
    for(let i = 0; i < 16; i++) {
        chave.push(Math.floor(Math.random() * 256));
    }

    var sql = `INSERT INTO usuarios (usuario, senha, chave) VALUES("${usuario}", "${encrypt(senha, chaveApp)}", "${chave}")`;
    conn.query(sql, function(erro, result){
        if(erro) throw erro;
        console.log("Usuário adicionado!")
        res.redirect('/');
    });
})

// Ação de cadastro de senha nova
app.post("/cadastrarSenha", function(req, res){
    // Buscando dados do formulário html
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var nota = req.body.nota;
    
    var encryptedPassword = encrypt(senha, chaveUsuarioLogado);
  
    // Inserindo nova senha no banco / Lançando possíveis erros
    var sql = `INSERT INTO senhas (usuario, id_usuario, senha, nota) VALUES ('${usuario}', '${usuarioLogado}', '${encryptedPassword}', '${nota}');`;
    conn.query(sql, function(erro, result){
        if(erro) throw erro;
        console.log("Senha adicionada!")
    });
    
    res.redirect('/novaSenha');
});

// Ação para excluir uma senha específica
app.post("/excluir/:id", function(req, res) {
    var id = req.params.id;  // Pega o ID da senha

    var sql = `DELETE FROM senhas WHERE id_senha = ${id}`;  // SQL com parâmetro
    conn.query(sql, function(erro, result) {
        if (erro) throw erro;

        // Redireciona de volta para a página principal após excluir a senha
        res.redirect("/index");
    });
});

// Ação para excluir tudo
app.post("/excluir-tudo", function(req, res) {
    var sql = `DELETE FROM senhas;`;

    conn.query(sql, function(erro, result) {
        if (erro) throw erro;

        // Redireciona para a página inicial após excluir tudo
        res.redirect("/index");
    });
});



app.listen(8080);

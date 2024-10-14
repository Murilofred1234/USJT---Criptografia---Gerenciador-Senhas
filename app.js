import express from 'express';
import { engine } from 'express-handlebars';
import * as mysql from 'mysql2'
import aesjs from 'aes-js';
// import "./js/script.js";


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
    console.log("Conexão efetuada com sucesso!")
});

// Criando app com express
const app = express();
// Adicionando CSS
app.use("/css", express.static("./css"))
// Configurando express-handlebards
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");
// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

// Rota principal
app.get("/", function(req, res){ 
    var sql = `SELECT * FROM senhas;`;

    conn.query(sql, function(erro, result){
        if (erro) throw erro;

        // Renderiza a página 'index' passando os resultados da consulta
        res.render("index", {
            senhas: result // passa o resultado da query para o template
        });
    });
});

app.get('/novaSenha', function(req, res){
    // render your contact.handlebars
    res.render("novaSenha");
});

// Rota de cadastro de senha nova
app.post("/cadastrarSenha", function(req, res){
    // Buscando dados do formulário html
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var nota = req.body.nota;
    var idUsuario = 1;

    // Definindo chave de criptografia
    var key = [];
    for(let i = 0; i < 16; i++) {
        key.push(Math.floor(Math.random() * 256))
    }
    
    // Encriptando a senha
    var senhaBytes = aesjs.utils.utf8.toBytes(senha);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(senhaBytes);
    var encryptedPassword = aesjs.utils.hex.fromBytes(encryptedBytes);
  
    // Inserindo nova senha no banco / Lançando possíveis erros
    var sql = `INSERT INTO senhas (usuario, id_usuario, senha, nota) VALUES ('${usuario}', '${idUsuario}', '${encryptedPassword}', '${nota}');`;
    conn.query(sql, function(erro, result){
        if(erro) throw erro;
        console.log("Senha adicionada!")
    });
    
    res.redirect('/novaSenha');
});

// Rota para excluir tudo
app.post("/excluir-tudo", function(req, res) {
    var sql = `DELETE FROM senhas;`;

    conn.query(sql, function(erro, result) {
        if (erro) throw erro;

        // Redireciona para a página inicial após excluir tudo
        res.redirect("/");
    });
});

app.listen(8080);

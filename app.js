import express from 'express';
import { engine } from 'express-handlebars';
import * as mysql from 'mysql2'
import aesjs from 'aes-js';

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
    res.render("index");
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
    var sql = `INSERT INTO senhas (usuario, id_usuario, senha, nota) VALUES ('${usuario}', '${idUsuario}', '${encryptedPassword}', '${nota}')`;
    conn.query(sql, function(erro, result){
        if(erro) throw erro;
        console.log("Senha adicionada!")
    });
    
    res.redirect('/novaSenha');
});
app.listen(8080);

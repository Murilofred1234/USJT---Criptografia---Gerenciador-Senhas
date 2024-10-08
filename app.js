import express from 'express';
import { engine } from 'express-handlebars';

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
app.get("/", function(req, res){
    res.render("novaSenha");
});

// Rota de cadastro
app.post("/cadastrar", function(req, res){
    var user = req.body.usuario
    var senha = req.body.senha
    var nota = req.body.nota
    console.log(user, senha, nota);
    res.end();
});

app.listen(8080);










// // Importando mysql2
// const mysql = require("mysql2");
// // Criando conexão sql
// const conn = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"1234",
//     database:"projetocriptografia"
// });
// // Conectando / Lançando possíveis erros
// conn.connect(function(erro){
//     if(erro) throw erro;
//     console.log("Conexão efetuada com sucesso!")

//     // Inserindo dados no banco / Lançando possíveis erros
//     var sql = "INSERT INTO senhas (usuario, senha, nota) VALUES ('murilofcorso', '12345', 'Senha do e-mail')";
//     conn.query(sql, function(erro, result){
//         if(erro) throw erro;
//         console.log("Funcionou!")
//     });
// });

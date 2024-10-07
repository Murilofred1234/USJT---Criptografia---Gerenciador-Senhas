import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index");
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

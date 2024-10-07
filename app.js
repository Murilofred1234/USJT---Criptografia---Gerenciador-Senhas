// const express = require("express");
// const app = express();
// app.get("/", function(req, res){
//     res.write("Hello World!");
//     res.end();
// })
// app.listen(8080);



const mysql = require("mysql2");
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"projetocriptografia"
});
conn.connect(function(erro){
    if(erro) throw erro;
    console.log("Conexão efetuada com sucesso!")
    var sql = "INSERT INTO senhas (usuario, senha, nota) VALUES ('murilofcorso', '12345', 'Senha do e-mail')";
    conn.query(sql, function(erro, result){
        if(erro) throw erro;
        console.log("Funcionou!")
    });
});

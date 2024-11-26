
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    chave VARCHAR(200) NOT NULL
)


CREATE TABLE senhas (
    id_senha INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_usuario INT NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    nota VARCHAR(300),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
)


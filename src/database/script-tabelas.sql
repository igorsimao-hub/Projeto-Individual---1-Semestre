-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/
/*
CREATE DATABASE aquatech;

USE aquatech;

CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	razao_social VARCHAR(50),
	cnpj CHAR(14),
	codigo_ativacao VARCHAR(50)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

create table medida (
	id INT PRIMARY KEY AUTO_INCREMENT,
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT,
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
);

insert into empresa (razao_social, codigo_ativacao) values ('Empresa 1', 'ED145B');
insert into empresa (razao_social, codigo_ativacao) values ('Empresa 2', 'A1B2C3');
insert into aquario (descricao, fk_empresa) values ('Aquário de Estrela-do-mar', 1);
insert into aquario (descricao, fk_empresa) values ('Aquário de Peixe-dourado', 2);
*/

create database pulpcine;

use pulpcine;

create table usuario (
id 		int auto_increment,
nome 	varchar(50),
email 	varchar(50),
senha 	varchar(50),
		primary key(id)
);

create table filme (
id 			int auto_increment,
titulo 		varchar(100),
ano	 		int,
diretor 	varchar(100),
sinopse 	text,
cartaz_url 	varchar(255),
			primary key(id)
);

create table avaliacao (
id 					int auto_increment,
nota_trilha_sonora 	int,
nota_fotografia 	int,
nota_enredo 		int,
nota_atuacoes 		int,
comentario 			text,
momento 			datetime default current_timestamp,
fk_usuario 			int,
fk_filme 			int,
					primary key(id),
					foreign key (fk_usuario) references usuario(id),
					foreign key (fk_filme) references filme(id)
);

create table curiosidade (
	id 		  	int auto_increment,
	titulo 	  	varchar(100),
	descricao 	TEXT,
	fk_filme  	INT,
				primary key(id),
				FOREIGN KEY (fk_filme) REFERENCES filme(id)
);

insert into filme (titulo, ano, diretor, sinopse, cartaz_url)
values 			  ('Pulp Fiction', 1994, 'Quentin Tarantino','Histórias entrelaçadas de crime em Los Angeles.','https://link-do-poster.com/pulpfiction.jpg');


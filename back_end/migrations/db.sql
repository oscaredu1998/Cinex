create database cine;

use cine;

create table personas(id int auto_increment not null primary key, nombre varchar(150), correo varchar(150), clave varchar(150));

create table peliculas(id int auto_increment not null primary key, titulo varchar(150), resumen varchar(150), categoria char (150), valorBoleto float(10,2), 
imagen longtext, estado boolean);

create table horarios(id int auto_increment not null primary key, hora varchar(100));

create table salas(id int auto_increment not null primary key, nombre varchar(150), descripcion varchar(150));

create table sala_peliculas(id int auto_increment not null primary key,
idpelicula int, foreign key (idpelicula) references peliculas(id),
idsala int, foreign key (idsala) references salas(id),
idhorario int, foreign key (idhorario) references horarios(id));

create table compras(id int auto_increment not null primary key, numero_boletos varchar(150), idpersona int, foreign key (idpersona) references personas(id),
idsala_peliculas int, foreign key (idsala_peliculas) references sala_peliculas(id));

insert into personas values(1,'admin','admin@gmail.com','1234');


-- FUNCIONES


DELIMITER $$ 
CREATE FUNCTION F_PELICULA(P_ID INTEGER)
RETURNS VARCHAR(150)
DETERMINISTIC
BEGIN
    DECLARE V_PELICULA VARCHAR(150);
 
    SELECT titulo INTO V_PELICULA
    FROM peliculas
    WHERE id = P_ID;
    RETURN V_PELICULA;
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION F_SALA(P_ID INTEGER)
RETURNS VARCHAR(150)
DETERMINISTIC
BEGIN
    DECLARE V_SALA VARCHAR(150);
 
    SELECT nombre INTO V_SALA
    FROM salas
    WHERE id = P_ID;
    RETURN V_SALA;
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION F_HORARIO(P_ID INTEGER)
RETURNS VARCHAR(150)
DETERMINISTIC
BEGIN
    DECLARE V_HORA VARCHAR(150);
 
    SELECT hora INTO V_HORA
    FROM horarios
    WHERE id = P_ID;
    RETURN V_HORA;
END$$
DELIMITER ;
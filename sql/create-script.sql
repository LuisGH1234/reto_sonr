create database liniodb;

use liniodb;

create table usuario (
	id int not null auto_increment,
    usuario varchar(45) not null,
    password varchar(45) not null,
    constraint usuario_pk primary key (id)
);

create table categoria (
	id int not null auto_increment,
    nombre varchar(45) not null,
    description varchar(45) not null,
    constraint categoria_pk primary key (id)
);

create table producto (
	id int not null auto_increment,
    nombre varchar(45) not null,
    descripcion varchar(45) not null,
    precio varchar(45) not null,
    categoria_id int not null,
    constraint producto_pk primary key (id),
    foreign key (categoria_id) references categoria(id)
);

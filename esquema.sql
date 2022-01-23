create database contactos;
create table usuarios(
    id integer not null auto_increment,
    name varchar(100) not null default '-',
    email varchar(50) not null default '-',
    fecha_alta timestamp not null default current_timestamp,
    primary key(id)
);
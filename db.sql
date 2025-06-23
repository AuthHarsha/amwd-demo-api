create database amwd;

use amwd;

show tables;

create table vehicles(
    id int auto_increment,
    brand varchar(50),
    model varchar(50),
    noOfGears int,
    price decimal(10,2),
    PRIMARY KEY(id)
);

desc vehicles;

create table spare_parts(
    id int auto_increment,
    description varchar(50),
    price decimal(10,2),
    vehicle_id int,
    PRIMARY KEY(id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE ON UPDATE CASCADE
);

desc spare_parts;

alter table vehicles add column color varchar(20);

alter table spare_parts add column code varchar(20) after id;

create table users(
    id int auto_increment,
    username varchar(50),
    email varchar(100),
    password varchar(255),
    PRIMARY KEY(id)
);
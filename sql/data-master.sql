use liniodb;

insert into categoria (nombre, description) values ('Linea Blanca', 'Cocina, Limpieza del hogar, Ventilacion');
insert into categoria (nombre, description) values ('Ropa', 'Informal/Formal, Interior, Deportiva, etc');
insert into categoria (nombre, description) values ('Juguetes', 'Juegos, Muñecas, peluches, etc');
insert into categoria (nombre, description) values ('Computo', 'Teclados, Monitores, Audifonos, etc');
select * from categoria;

insert into producto (nombre,descripcion,precio,categoria_id) values ('LS65SXN','Refrigeradora Instaview Door-in-Door con Inverter Linear Compressor (10 años de garantía) y 601L de capacidad','5000',1);
insert into producto (nombre,descripcion,precio,categoria_id) values ('GS65SDPN','Refrigeradora con Puerta Mágica (Door-in-Door), Inverter Linear Compressor (10 años de garantía) y 601L de capacidad','3000',1);
insert into producto (nombre,descripcion,precio,categoria_id) values ('RSG313M','Cocina RSG313M','2000',1);
insert into producto (nombre,descripcion,precio,categoria_id) values ('MH6536GIS','Horno Microondas con Dorador 25 Litros','9000',1);
insert into producto (nombre,descripcion,precio,categoria_id) values ('MS2596DIR','Horno Microondas NeoChef 25 Litros','1900',1);

insert into producto (nombre,descripcion,precio,categoria_id) values ('POLO 3 TIRAS','POLO 3 TIRAS','200',2);
insert into producto (nombre,descripcion,precio,categoria_id) values ('HOODED TRACK TOP M ZNE HD FR','Este/a modelo mide 185 cm y lleva una talla M. Su pecho mide 100 cm y su cintura, 82 cm.','279',2);
insert into producto (nombre,descripcion,precio,categoria_id) values ('POLERA CON CAPUCHA TRIFOLIO OVERSIZE','Este/a modelo mide 182 cm y lleva una talla M. Su pecho mide 83 cm y su cintura, 71 cm.','200',2);
select * from producto;

insert into usuario (usuario, password) values ('admin', 'admin');
select * from usuario;
select * from usuario where usuario='admin' and password='admin';
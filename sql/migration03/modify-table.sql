use liniodb;

# Many to Many between usuario and producto
create table venta (
	id int not null auto_increment,
    time bigint not null,
    descripcion varchar(100) null,
    usuario_id int not null,
    producto_id int not null,
    constraint venta_pk primary key (id),
    foreign key (usuario_id) references usuario(id),
    foreign key (producto_id) references producto(id)
);
ALTER TABLE venta ADD COLUMN cantidad int not null;
select * from venta;
select * from usuario;
insert into venta (time,usuario_id,producto_id,cantidad) values (1550790470523, 2,1,1);

DROP procedure IF exists getVentas;
DELIMITER //
create procedure getVentas ()
begin
		select v.time, c.nombre 'categoria', p.nombre 'producto', p.precio, v.cantidad, v.descripcion  
        from venta v
        left join producto p on v.producto_id=p.id
        left join categoria c on p.categoria_id=c.id;
end//
DELIMITER ;

call getVentas();

DROP procedure IF exists comprarProducto;
DELIMITER //
create procedure comprarProducto (in cantidadv int, in idProducto int, in timev bigint, in usuariov int)
begin
		select @reservas :=  p.reservado, @stock1 := p.stock
        from producto p where p.id = idProducto;
        set @resultadoReserva := @reservas - cantidadv;
        set @resultadoStock := @stock1 - cantidadv;
        update producto set reservado=@resultadoReserva, stock=@resultadoStock
        where id=idProducto;
        insert into venta (time,usuario_id,producto_id,cantidad) values (timev, usuariov,idProducto,cantidadv);
end//
DELIMITER ;
use liniodb;

ALTER TABLE usuario ADD COLUMN saltstamp text;
ALTER TABLE usuario CHANGE COLUMN `password` `passwordhash` TEXT NOT NULL;

ALTER TABLE producto ADD COLUMN stock int default 0;
ALTER TABLE producto ADD COLUMN reservado int default 0;

DROP procedure IF exists getProducto;
DELIMITER //
create procedure getProducto (in idProducto int)
begin
		select p.id, p.nombre, p.descripcion, p.precio, c.nombre 'categoria_nombre', p.stock, p.reservado 
        from producto p
        left join categoria c on p.categoria_id=c.id
        where p.id=idProducto;
end//
DELIMITER ;

DROP procedure IF exists reservarProducto;
DELIMITER //
create procedure reservarProducto (in reservado int, in idProducto int)
begin
		select @reservas :=  p.reservado
        from producto p where p.id = idProducto;
        set @resultado := @reservas + reservado;
        update producto set reservado=@resultado where id=idProducto;
end//
DELIMITER ;

call reservarProducto(2,101);
select * from producto where id=101;
update producto set reservado=0 where id=101;


DROP procedure IF exists comprarProducto;
DELIMITER //
create procedure comprarProducto (in cantidad int, in idProducto int)
begin
		select @reservas :=  p.reservado, @stock1 := p.stock
        from producto p where p.id = idProducto;
        set @resultadoReserva := @reservas - cantidad;
        set @resultadoStock := @stock1 - cantidad;
        update producto set reservado=@resultadoReserva, stock=@resultadoStock
        where id=idProducto;
end//
DELIMITER ;

call comprarProducto(2, 101);
select * from producto where id=101;


import React, { Component } from 'react';

export interface IProduct {
    id?: number,
    nombre:string, 
    descripcion: string, 
    precio: string,
    categoria_id?: number
    categoria_nombre?: string,
    stock?: number,
    reservado?: number
}

export class Product extends Component<IProduct> {

    private validateDescription(descripcion: string): string {
        if(descripcion.length > 45){
            descripcion = descripcion.substr(0, 42) + '...';
        }
        return descripcion;
    }

    public render(): JSX.Element {
        const { nombre, descripcion, precio } = this.props;
        return (
            <div className="product">
                <img src="img/no_image.png" alt="product image"/>
                <p className="nombre">{ nombre }</p>
                <p className="descripcion">{ this.validateDescription(descripcion) }</p>
                <p className="precio">{ precio }</p>
            </div>
        );
    }
}
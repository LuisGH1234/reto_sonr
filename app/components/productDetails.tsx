import React, { Component } from 'react';
import {  RouteComponentProps, Link } from 'react-router-dom';

import { IProduct } from './product';

interface IParams {
    idproducto: string
}

interface IProps extends RouteComponentProps<IParams> {
    //children?: JSX.Element
}

export default class ProductDetails extends Component<IProps, IProduct> {
    constructor(props: IProps){
        super(props);
        this.state = {
            nombre: "",
            descripcion: "",
            precio: ""
        };
        this.fetchProduct();
    }

    fetchProduct() {
        const { params } = this.props.match;
        fetch(`/api/productos/${params.idproducto}`)
        .then(res => res.json())
        .then(product => this.setState(product))
        .catch(console.error)
    }
    /*async fetchProduct() {
        const { params } = this.props.match;
        const product = await (await fetch(`/api/productos/${params.idproducto}`)).json()
        return product;
    }*/

    public render(): JSX.Element {
        const { nombre, descripcion, precio, categoria_nombre } = this.state;
        return (
            <div className="container-product-detail">
                <img src="img/no_image.png" alt="product image"/>
                <div className="details">
                    <div className="top-name">
                        <h1 className="nombre">{ nombre }</h1>
                        <h3 className="categoria_nombre">{ categoria_nombre }</h3>
                    </div>
                    <p className="precio">{ precio }</p>
                    <p className="descripcion">{ descripcion }</p>
                    <Link to='/comprar' className="btn-compra" style={{border: "2px solid red" }}>Comprar</Link>
                </div>
            </div>
        );
    }
}
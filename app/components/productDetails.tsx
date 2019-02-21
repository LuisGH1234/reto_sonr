import React, { Component } from 'react';
import {  RouteComponentProps, Link } from 'react-router-dom';

import { IProduct } from './product';

interface IParams {
    idproducto: string
}

interface IProps extends RouteComponentProps<IParams> {
    //children?: JSX.Element
}

interface IState extends IProduct {
    cantidad: number
}

export default class ProductDetails extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            cantidad: 0,
            nombre: "",
            descripcion: "",
            precio: ""
        };
        this.fetchProduct();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.reservarProductos = this.reservarProductos.bind(this);
    }

    fetchProduct() {
        const { params } = this.props.match;
        fetch(`/api/productos/${params.idproducto}`)
        .then(res => res.json())
        .then(product => this.setState(product))
        .catch(console.error)
    }

    reservarProductos(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        const temp = window.location.pathname;
        let res = { time: new Date().getTime(), 
            cantidad: this.state.cantidad, 
            idProducto: this.state.id,
            pathname: window.location.pathname };
        let obj = JSON.stringify(res);
        localStorage.setItem("reserva", obj);
        fetch(`/api/productos/reserva/${this.state.id}?reservado=${this.state.cantidad}`,{
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            if(data.status !== "ok") {
                localStorage.removeItem("reserva");
            }
            console.log(data);
        })
        .catch(console.error);
    }

    handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
         } as Pick<unknown, keyof unknown>);
    }

    render(): JSX.Element {
        const { nombre, descripcion, precio, categoria_nombre, stock, reservado } = this.state;
        const stockactual = stock! - reservado!;
        //console.log(stockactual);
        const isAvailable = stockactual > 0? "isAvailable" : "isDisabled";
        return (
            <div className="container-product-detail">
                <img src="img/no_image.png" alt="product image"/>
                <div className="details">
                    <div className="top-name">
                        <h1 className="nombre">{ nombre }</h1>
                        <h3 className="categoria_nombre">{ categoria_nombre }</h3>
                    </div>
                    <p className="precio">{ precio }</p>
                    <p className="stock">Stock: { stock }</p>
                    <p className="descripcion">{ descripcion }</p>
                    <input type="number" name="cantidad" value={this.state.cantidad} onChange={this.handleInputChange}/>
                    <br/>
                    <Link to='/comprar' className={`btn-compra ${isAvailable}`} 
                        style={{border: "2px solid red" }}
                        onClick={this.reservarProductos}>Comprar</Link>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { IProduct } from './product';

interface IState {
    productos: IProduct[],
    nombre: string,
    descripcion: string,
    categoria_id: string,
    precio: string,
    id: number
}

interface IProps {
    token: string
}

export default class Administation extends Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            productos: [],
            nombre: "",
            descripcion: "",
            categoria_id: "1",
            precio: "",
            id: 0
        }
        this.fetchProducts = this.fetchProducts.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleProduct = this.handleProduct.bind(this);
        this.trContent = this.trContent.bind(this);
        this.popupComponent = this.popupComponent.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentDidMount() {
        this.fetchProducts();
    }

    handleCerrarSesion() {
        let inToken = document.getElementById("token") as HTMLInputElement;
        inToken.value = "";
    }

    fetchProducts() {
        const url: string = "/api/productos";
        fetch(url)
        .then(res => res.json())
        .then(productos => this.setState({ productos }))
        .catch(console.error);
    }

    trContent(producto: IProduct, index: number): JSX.Element {
        return (
            <tr key={index}>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.categoria_id}</td>
                <td>{producto.precio}</td>
                <td>{this.popupComponent("Editar", index)} | {this.deleteComponent(producto.id!)}</td>
            </tr>
        );
    }

    deleteComponent(idProduct: number): JSX.Element {
        return (
            <button onClick={() => this.deleteProduct(idProduct)}>
                Eliminar
            </button>
        );
    }

    deleteProduct(idProduct: number) {
        fetch(`/api/productos/${idProduct}`, {
            method: 'DELETE'
        })
        .then(() => this.fetchProducts())
        .catch(console.error);
    }

    handleProduct(e: React.FormEvent<HTMLFormElement>, close: () => void) {
        let url = "/api/productos/";
        let inToken = document.getElementById("token") as HTMLInputElement;
        const { categoria_id, nombre, descripcion, precio, id } = this.state;
        if(id) {
            url += `${id}`;
        }
        fetch(url, {
            method: this.state.id? 'PUT' : 'POST',
            body: JSON.stringify({ categoria:parseInt(categoria_id), nombre, descripcion, precio }),
            headers: {
                'Authorization': `Bearer ${inToken.value}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === "ok"){
                this.fetchProducts();
                this.setState({ 
                    nombre: "", 
                    descripcion: "", 
                    precio: "", 
                    categoria_id: "", 
                    id: undefined });
                    close();
            }
        })
        .catch(console.error);
        e.preventDefault();
    }

    handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        //as Pick<IState, keyof IState>
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    onEdit(indexProduct?: number){
        if(indexProduct || indexProduct == 0){
            const { nombre, descripcion, precio, categoria_id, id } = this.state.productos[indexProduct];
            this.setState({ nombre, descripcion, precio, categoria_id, id });
        } else {
            this.setState({ nombre: "", descripcion: "", precio: "", categoria_id: "", id: undefined });
        }
    }

    popupComponent(strAction: string, indexProduct?: number):JSX.Element {
        return (
            <Popup trigger={<button className="button"> {strAction} </button>} 
            modal onOpen={()=>this.onEdit(indexProduct)}>
                {close => (
                    <div className="modal">
                        <a className="close" onClick={close}>&times;</a>
                        <div className="header"> {strAction} </div>
                        <div className="content">
                            <form onSubmit={e=>this.handleProduct(e,close)} className="bordered none">
                                <div className="item">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input name="nombre" id="nombre" value={this.state.nombre}
                                    onChange={this.handleInputChange}/>
                                </div>
                                <div className="item">
                                    <label htmlFor="descripcion">Descripcion</label>
                                    <textarea name="descripcion" id="descripcion" value={this.state.descripcion}
                                    onChange={this.handleInputChange}></textarea>
                                </div>
                                <div className="item">
                                    <label htmlFor="categoria">Categoria</label>
                                    <select name="categoria_id" id="categoria_id" 
                                    onChange={this.handleInputChange}
                                    value={this.state.categoria_id}>
                                        <option value="1">Linea Blanca</option>
                                        <option value="2">Ropa</option>
                                        <option value="3">Juguetes</option>
                                        <option value="4">Computo</option>
                                    </select>
                                </div>
                                <div className="item">
                                    <label htmlFor="precio">Precio</label>
                                    <input name="precio" id="precio" value={this.state.precio}
                                     onChange={this.handleInputChange}/>
                                </div>
                                <div className="btn-submit">
                                    <input type="submit" value="Grabar" />
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Popup>
        );
    }

    public render(): JSX.Element {
        let inToken = document.getElementById("token") as HTMLInputElement;
        if(!inToken.value) {
            return <Redirect to="/login" />
        }
        const { productos } = this.state;
        return (
            <div className="container-administration">
                <header>
                    <div className="top">
                        <h2>Administrador Ecommerce</h2>
                    </div>
                </header>
                <div className="bottom">
                    <div className="left-side">
                        <div className="item">
                            <a>Productos</a>
                        </div>
                        <div className="item">
                            <a>Categorias</a>
                        </div>
                        <div className="item">
                            <a>Usuarios</a>
                        </div>
                        <div className="item">
                            <Link to="/login" onClick={this.handleCerrarSesion}>Cerrar Sesion</Link>
                        </div>
                    </div>
                    <div className="right-side">
                        <h1>Productos</h1><br/>
                        {this.popupComponent("Agregar")}
                        <div className="list-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripcion</th>
                                        <th>Categoria</th>
                                        <th>Precio</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map(this.trContent)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
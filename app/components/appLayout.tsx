import React, { Component } from 'react';
import { Switch, Route, Link, RouteComponentProps, Redirect } from 'react-router-dom';

import NavBar from './navbar';
import Products from './products';
import ProductDetails from './productDetails';
import { IProduct } from './product';

interface IProps extends RouteComponentProps {
    //children?: JSX.Element
}

interface IState {
    productos: IProduct[],
    tempProductos: IProduct[],
    categoria: number
}

export default class AppLayout extends Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
        this.state = {
            productos: [],
            tempProductos: [],
            categoria: 0
        }
        this.fetchProducts = this.fetchProducts.bind(this);
        this.updateList = this.updateList.bind(this);
        this.updateCategoria = this.updateCategoria.bind(this);
    }

    componentDidMount() {
        if(this.state.categoria === 0) {
            this.fetchProducts(0);
        }
    }

    updateCategoria(categoria: number): void {
        this.setState({categoria});
    }

    updateList(key: string): void {
        if (key === "") {
            return this.setState({ tempProductos: this.state.productos });
        }
        key = key.toLowerCase();
        const { productos } = this.state;
        let newProductos: IProduct[] = productos.filter((producto, index) => {
            const descripcion = producto.nombre.toLowerCase();
            if(descripcion.includes(key)){
                return producto;
            }
        });

        this.setState({ tempProductos: newProductos });
    }

    fetchProducts(categoria?: number): void {
        console.log(categoria);
        let url: string = `/api/categorias/${categoria}/productos`;
        if(!categoria){ 
            url = `/api/productos`;
        }
        fetch(url)
        .then(res => res.json())
        .then(productos => this.setState({ productos, tempProductos: productos }))
        .catch(console.error);
    }

    public render(): JSX.Element {
        return (
            <div>
                <header>
                    <NavBar updateList={this.updateList} 
                        fetchProducts={this.fetchProducts}/>
                </header>
                <Switch>
                    <Route  path="/categorias/list" render={
                        (props) => <Products productos={this.state.tempProductos} 
                        {...props}/>}/>
                    <Route path="/categorias/linea_blanca/list" render={
                        (props) => <Products productos={this.state.tempProductos}
                        {...props}/>}/>
                    <Route path="/categorias/ropa/list" render={
                        (props) => <Products productos={this.state.tempProductos}
                        {...props}/>}/>
                    <Route path="/categorias/juguetes/list" render={
                        (props) => <Products productos={this.state.tempProductos}
                        {...props}/>}/>
                    <Route path="/categorias/computo/list" render={
                        (props) => <Products productos={this.state.tempProductos}
                        {...props}/>}/>
                </Switch>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Route, RouteComponentProps, Link, Switch, Redirect } from 'react-router-dom';

import ProductDetail from './productDetails';
import { IProduct, Product } from './product';

interface IProps extends RouteComponentProps{
    productos: IProduct[]
}

export default class Products extends Component<IProps> {
    constructor(props: IProps){
        super(props);
        this.listProducts = this.listProducts.bind(this);
        this.ComponentList = this.ComponentList.bind(this);
    }

    public componentDidMount(): void {
        document.title = "Linio";
        
    }

    private listProducts(product: IProduct, index: number): JSX.Element {
        const { path, url } = this.props.match;
        return (
                <Link to={`${url}/productos/${product.id}`} 
                className="product-link" key={index}>
                    <Product nombre={product.nombre} 
                        descripcion={product.descripcion} 
                        precio={product.precio} />
                </Link>
        );
    }

    public ComponentList(productos: IProduct[]): any {
        return (
            <div className="content">
                <div className="container grid">
                    { productos && productos.map(this.listProducts) }
                </div>
            </div>
        );
    }

    public render(): JSX.Element {
        
        const { productos, match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.url}`} component={()=>this.ComponentList(productos)}/>
                <Route path={`${match.url}/productos/:idproducto`} 
                component={ProductDetail}/>
            </Switch>
        );
    }
}
import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

interface IState {
    search: string
}

interface IProps  {
    updateList: (key: string) => void,
    fetchProducts: (categoria?: number) => void
}

export default class NavBar extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            search: ''
        };
        this.handleInputSearch = this.handleInputSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        if (performance.navigation.type == 1) {
            const { pathname } = window.location;
            const newUrl = pathname.slice(12, -5);
            //console.log(newUrl);
            switch(newUrl){
                case "linea_blanca":
                    document.getElementById(newUrl)!.click();
                    break;
                case "ropa":
                    document.getElementById(newUrl)!.click();
                    break;
                case "juguetes":
                    document.getElementById(newUrl)!.click();
                    break;
                case "computo":
                    document.getElementById(newUrl)!.click();
                    break;
                case "":
                    document.getElementById("logo-header")!.click();
                    break;
            }
        }
    }
    private handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { search } = this.state;
        this.props.updateList!(search);
    }

    private handleInputSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        } as Pick<IState, keyof IState>);
    }

    public render(): JSX.Element {
        return (
            <div className="navbar">
                <div className="top-nav">
                    <Link to="/categorias/list" className="to-left" id="logo-header"
                    onClick={(e)=>{this.props.fetchProducts!(0)}}>
                    Linio
                    </Link>
                    <Link to="/login" className="to-right top">Administrador</Link>
                    <form onSubmit={this.handleSearch} className="to-right bottom">
                        <input id="box-search" placeholder="Search" name="search"
                         onChange={this.handleInputSearch}/>
                        <input value="Search" type="submit" className="btn-search"/>
                    </form>
                </div>
                <div className="bot-nav">
                    <div className="links">
                    <Link to="/categorias/linea_blanca/list" id="linea_blanca"
                    onClick={(e)=>this.props.fetchProducts!(1)}>
                    Linea Blanca</Link>
                    <Link to={`/categorias/ropa/list`} id="ropa"
                    onClick={(e)=>this.props.fetchProducts!(2)}>
                    Ropa</Link>
                    <Link to={`/categorias/juguetes/list`} id="juguetes"
                    onClick={(e)=>this.props.fetchProducts!(3)}>
                    Juguetes</Link>
                    <Link to={`/categorias/computo/list`} id="computo"
                    onClick={(e)=>this.props.fetchProducts!(4)}>
                    Computo</Link>
                    </div>
                </div>
            </div>
        );
    }
}
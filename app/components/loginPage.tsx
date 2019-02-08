import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface IState {
    usuario: string,
    password: string
}

export default class LoginPage extends Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            usuario: "",
            password: ""
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        } as Pick<IState, keyof IState>);
    }

    private handleLogin(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const { usuario, password } = this.state;
        fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ usuario, password }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const token = res.headers.get('token');
            if (token){
                let inToken = document.getElementById("token")! as HTMLInputElement;
                inToken.value = token;
            }
            return res.json();
        })
        .then(data => {
            if(data.access == "true"){
                console.log(data);
                this.props.history.push('/administracion');
            }
        })
        .catch(console.error);
    }

    public render(): JSX.Element {
        return (
            <div className="container-login-page">
                <div className="left-side">
                    <img src="img/no_image.png" alt="Poster Login" />
                </div>
                <div className="right-side">
                    <h1>Bienvenido</h1>
                    <form onSubmit={this.handleLogin}>
                        <div className="user item">
                            <label htmlFor="usuario">Usuario: </label>
                            <input id="usuario" name="usuario" type="text" 
                            value={this.state.usuario} onChange={this.handleInputChange}/>
                        </div>
                        <div className="password item">
                            <label htmlFor="password">Contraseña: </label>
                            <input id="password" name="password" type="password" 
                            value={this.state.password} onChange={this.handleInputChange}/>
                        </div>
                        <div className="btn-submit">
                            <input type="submit" value="Iniciar sesion" id="login"/>
                        </div>
                    </form>
                    <Link to="/categorias" className="back-from-login">Regresar</Link>
                </div>
            </div>
        );
    }
}
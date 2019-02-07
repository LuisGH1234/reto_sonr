import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LoginPage extends Component<any> {

    constructor(props: any) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    private handleLogin(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.props.history.push('/administracion');
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
                        <div className="user">
                            <label htmlFor="user">Usuario: </label>
                            <input id="user" name="user" type="text"/>
                        </div>
                        <div className="password">
                            <label htmlFor="password">Contraseña: </label>
                            <input id="password" name="password" type="password"/>
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
import React, { Component } from 'react';

export default class Administation extends Component {
    public render(): JSX.Element {
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
                            <a>Cerrar Sesion</a>
                        </div>
                    </div>
                    <div className="right-side">
                        <h1>Productos</h1><br/>
                        <a>Agegar</a>
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
                                    <tr>
                                        <td>asasd</td>
                                        <td>asasd</td>
                                        <td>asasd</td>
                                        <td>asasd</td>
                                        <td><a>Editar</a><a>Eliminar</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';

interface IVenta {
    time: number,
    categoria: string,
    producto: string,
    precio: string,
    cantidad: number,
    descripcion?: string
}

interface IState {
    ventas: IVenta[]
}

export default class Ventas extends Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            ventas: []
        }
        this.fetchVentas();
    }
    fetchVentas() {
        fetch("/api/ventas")
        .then(res => res.json())
        .then(ventas => this.setState({ventas}))
        .catch(console.error);
    }
    trContent(venta: IVenta, index: number): JSX.Element {
        const fecha = new Date(venta.time);
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{venta.categoria}</td>
                <td>{venta.producto}</td>
                <td>{venta.precio}</td>
                <td>{venta.cantidad}</td>
                <td>{fecha.toUTCString()}</td>
            </tr>
        );
    }
    render(): JSX.Element {
        return (
            <div>
                <h1>Ventas</h1><br />
                <div className="list-table">
                    <table>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Categoria</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.ventas.map(this.trContent)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
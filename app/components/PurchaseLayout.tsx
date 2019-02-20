import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Compra, ICompra } from './Compra';

export default class PurchaseLayout extends Component<any, ICompra> {
    constructor(props: any) {
        super(props);
        this.state = {
            continuar: false,
            metodoPago: "",
            numTarjeta: "",
            mesCaduc: 0,
            anioCaduc: 0,
            codSeg: "",
            nombre: "",
            apellidos: "",
            localidad: "",
            codigoPostal: "",
            direccion: "",
            telefono: ""
        }
        this.actualizarPaso = this.actualizarPaso.bind(this);
        this.handleInputChange= this.handleInputChange.bind(this);
    }
    handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }
    actualizarPaso(continuar: boolean) {
        this.setState({ continuar });
    }
    pasos(): JSX.Element {
        if(!this.state.continuar) {
            return <Compra continuar={this.actualizarPaso} handleInputChange={this.handleInputChange} fatherState={this.state}/>
        }
        return <div>Revision <a onClick={(e) => this.setState({continuar:false})}>regresar</a></div>
    }
    render(): JSX.Element {
        return (
            <div>
                <header>
                    <div>
                        <h4>Informacion del pago</h4>
                    </div>
                    <div>
                        <h4>Revision + Compra</h4>
                    </div>
                </header>
                {this.pasos()}                
            </div>
        );
    }
}
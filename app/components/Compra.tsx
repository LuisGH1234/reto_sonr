import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { lehn, isMastercard, isVisa } from './validator';

export interface ICompra {
    continuar?: boolean,
    metodoPago?: string,
    numTarjeta?: string,
    mesCaduc?: number,
    anioCaduc?: number,
    codSeg?: string,
    nombre?: string,
    apellidos?: string,
    localidad?: string,
    codigoPostal?: string,
    direccion?: string,
    telefono?: string
}

interface IProps {
    continuar: (value: boolean) => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    fatherState: ICompra
}
export class Compra extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.validarTarjeta = this.validarTarjeta.bind(this);
        this.validarNumTarjeta = this.validarNumTarjeta.bind(this);
    }
    static* aniosOption(): IterableIterator<JSX.Element> {
        const anioactual = new Date().getFullYear();
        for (let i = anioactual; i < anioactual + 26; i++){
            yield <option value={i} key={i}>{i}</option>
        }
    }
    static* mesesOption(): IterableIterator<JSX.Element> {
        for (let i = 1; i < 13; i++) {
            yield <option value={i} key={i}>{i}</option>
        }
    }
    validarTipotarjeta(tipo: string, num: string): boolean {
        switch(tipo) {
            case 'visa':
                return isVisa(num);
            case 'mastercard':
                return isMastercard(num);
            default:
                return false;
        }
    }
    validarNumTarjeta(numTarjeta: string) {
        if(numTarjeta) {
            const val = lehn(numTarjeta);
            if(val) {
                this.props.continuar(true);
            } else {
                let ele = document.getElementById("card") as HTMLLabelElement;
                ele.innerText = "tarjeta no valida";
                console.log("tarjeta no valida");
            }
        }
    }
    validarTarjeta(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { numTarjeta, metodoPago } = this.props.fatherState;
        if(this.validarTipotarjeta(metodoPago!,numTarjeta!)){
            this.validarNumTarjeta(numTarjeta!);
        } else {
            let ele = document.getElementById("card") as HTMLLabelElement;
            ele.innerText = "Tipo de tarjeta invalido";
            console.log("Tipo de tarjeta invalido");
        }
    }
    render(): JSX.Element {
        const {fatherState,handleInputChange} = this.props;
        return (
            <div>
                <h2>METODO DE PAGO</h2>
                <form onSubmit={this.validarTarjeta}>
                    <a onClick={() => window.history.back()}>Regresar</a>
                    <label>Selecciona e metodo de pago</label>
                    <select name="metodoPago" value={fatherState.metodoPago} onChange={handleInputChange}>
                        <option value="visa">Visa</option>
                        <option value="mastercard">Mastercard</option>
                    </select>
                    <br/>
                    <br/>
                    <label>Numero de tarjeta</label>
                    <input name="numTarjeta" type="text" value={fatherState.numTarjeta} onChange={handleInputChange}/>
                    <br/>
                    <br/>
                    <label>Fecha de caducidad y codigo de seguridad</label>
                    <select name="mesCaduc" value={fatherState.mesCaduc} onChange={handleInputChange}>
                        {Array.from(Compra.mesesOption())}
                    </select>
                    <select name="anioCaduc" value={fatherState.anioCaduc} onChange={handleInputChange}>
                        {Array.from(Compra.aniosOption())}
                    </select>
                    <input name="codSeg" type="text" value={fatherState.codSeg} onChange={handleInputChange}/>
                    <br/>
                    <br/>
                    <h4>INFORMACION DE FACTURACION</h4>
                    <div>
                        <label>Nombre</label>
                        <input name="nombre" type="text" value={fatherState.nombre} onChange={handleInputChange}/>

                        <label>Apellidos</label>
                        <input name="apellidos" type="text" value={fatherState.apellidos} onChange={handleInputChange}/>

                        <label>Direccion de facturacion</label>
                        <input name="direccion" type="text" value={fatherState.direccion} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label>Localidad</label>
                        <input name="localidad" type="text" value={fatherState.localidad} onChange={handleInputChange}/>

                        <label>Codigo postal</label>
                        <input name="codigoPostal" type="text" value={fatherState.codigoPostal} onChange={handleInputChange}/>

                        <label>Telefono</label>
                        <input name="telefono" value={fatherState.telefono} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <p>Pordras revisar tu pedido antes de se procese.</p>
                    </div>
                    <br/>
                    <br/>
                    <input type="submit" value="Continuar"/>
                </form>
                <label id="card"></label>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
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

interface IState {
    time: number,
    cantidad: string,
    idProducto: number,
    pathname: string
}

interface IProps {
    continuar: (value: boolean) => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    fatherState: ICompra
    
}
export class Compra extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.validarTarjeta = this.validarTarjeta.bind(this);
        this.validarNumTarjeta = this.validarNumTarjeta.bind(this);
        this.deshacerReserva = this.deshacerReserva.bind(this);
        this.comprar = this.comprar.bind(this);
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
    obtenerReservaStorage(): IState {
        //No funciona este metodo, causa bugs
        //debe obtenerse el objeto de forma manual
        console.log(localStorage.getItem("reserva"));
        return JSON.parse(localStorage.getItem("reserva")!);
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
    validarNumTarjeta(numTarjeta: string): void {
        const val = lehn(numTarjeta);
        if(!val) {
            //this.props.continuar(true);
            throw new Error("Numero de tarjeta no valido");
        }
    }
    validarTarjeta(): void {
        const { numTarjeta, metodoPago } = this.props.fatherState;
        if(this.validarTipotarjeta(metodoPago!,numTarjeta!)){
            return this.validarNumTarjeta(numTarjeta!);
        } else {
            throw new Error("Tipo de tarjeta invalido");
        }
    }
    comprar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            this.validarTarjeta();
            const {idProducto,cantidad,pathname} = JSON.parse(localStorage.getItem("reserva")!);
            return this.fetchCompra(idProducto, cantidad, pathname);
        } catch (error) {
            let ele = document.getElementById("card") as HTMLLabelElement;
            ele.innerText = error.message;
        }
    }
    fetchCompra(idProducto: number, cantidad: string, pathname: string) {
        fetch(`/api/productos/comprar/${idProducto}?cantidad=${cantidad}`,{
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.status === "ok"){
                localStorage.removeItem("reserva");
                window.location.replace(pathname);
                //this.props.history.push(pathname);
            }
        })
        .catch(console.error);
    }
    deshacerReserva(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        //e.preventDefault();
        const obj = JSON.parse(localStorage.getItem("reserva")!);
        const cant = obj.cantidad * -1;
        fetch(`/api/productos/reserva/${obj.idProducto}?reservado=${cant}`,{
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === "ok") {
                localStorage.removeItem("reserva");
            }
            console.log(data);
        })
        .catch(console.error);
    }
    render(): JSX.Element {
        const {fatherState,handleInputChange} = this.props;
        const {pathname} = JSON.parse(localStorage.getItem("reserva")!);
        return (
            <div>
                <h2>METODO DE PAGO</h2>
                <form onSubmit={this.comprar}>
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
                        <p>Pordras revisar tu pedido antes de que se procese.</p>
                    </div>
                    <br/>
                    <br/>
                    <input type="submit" value="Continuar"/>
                    <Link to={pathname} onClick={this.deshacerReserva}>Cancelar</Link>
                </form>
                <label id="card"></label>
            </div>
        );
    }
}
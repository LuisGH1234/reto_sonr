function* duplicarDigitos(numero: string) {
    for(let i = 0; i < numero.length; i++) {
        let num = parseInt(numero[i]);
        if(i % 2 === 0) {
            let temp = num * 2; //string to number
            if(temp > 9){
                temp = Math.floor(temp / 10) + (temp % 10);
            }
            yield temp;
        } else {
            yield num * 1;
        }
    }
}

function sumarDigitos(generator: any): number {
    let resultado = 0;
    for(let value of generator) {
        resultado += value;
    }
    return resultado;
}

function esValido(sumaResultado: number): boolean {
    return sumaResultado % 10 === 0;
}

export function lehn(num: string): boolean {
    const generator = duplicarDigitos(num);
    const sum = sumarDigitos(generator);
    return esValido(sum);
}

export function isVisa(digitos: string): boolean {
    return /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(digitos);
}

export function isMastercard(digitos: string): boolean {
    return /^(?:5[1-5][0-9]{14})$/.test(digitos);
}
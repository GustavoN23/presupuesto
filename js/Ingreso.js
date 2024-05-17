// creamos un atributo estatico para que cada que se cree un item nuevo y unico con el que podamos identificar este item 

class Ingreso extends Dato{

    static contadorIngresos = 0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id = ++Ingreso.contadorIngresos;
        // con est LINEA DE CODIGO se crea el id de cada valor que se  cree ,++Ingreso.contadorIngresos;
    }
    get id(){
        return this._id
    }

}
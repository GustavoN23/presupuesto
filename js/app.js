// desde aca se controlan los arreglos que contine la informacion de los ingresos y egresos 

const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta Coche', 1500.00)
];

const egresos = [
    new Egreso('Renta Casa', 900),
    new Egreso('Ropa', 400)
];
// esta funcion carga cuando carga la pagina 
let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}
// funcion para recorrer el arreglo de ingresos
let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;

}
// funcion para recorrer el arreglo de egresos

let totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

// esta funcion carga el cabecero, y muestra todas las operaciones en pantalla 
let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

// creamos un afuncion para darle formato al moneda

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 });
}

// funcion formato porcentaje 
const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 1 });
}

//  creamos la fununcion para cargar ingresos

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

//  creamos funcion para crear el ingreso 

const crearIngresoHTML = (ingreso) => {

    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                  <ion-icon name="close-circle-outline"
                   onclick='eliminarIngreso(${ingreso.id})' ></ion-icon>
                </button>
              </div>
            </div>
          </div>
    `;
    return ingresoHTML;

}
// creamos la funcion eleminar ingreso 
const eliminarIngreso = (id) => {
    // findINdex se usa para buscar en nuestro arreglo es como un for(let ingreso of ingresos)
    // creamos una funcion flecha dentro del findindex ,se define un avaribale ingreso, debido aque es un argumento omitimos los parentesis y como solo es una linea podemos omitir las llaves
    // con el findindex se recorre el objecto buscando el indice del id proporcionado, y si este es igual al que hay en el objecto, se detiene la busqueda del objeto y devuelve  indice del objeto
    //en resumen se compara los id 
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    // para eleminar el elemento utilizamos la funcion splice
    // he eindicamos que solo se va eliminar un elemento
    ingresos.splice(indiceEliminar, 1);
    // una vezx elminado cargamos el cabecero y el listado de ingresos
    cargarCabecero();
    cargarIngresos();

}

// creamos la funcion para crear y cargar los egresos 

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
      <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn">
          <ion-icon name="close-circle-outline"
          onclick='eliminarEgreso(${egreso.id})' ></ion-icon>
        </button>
      </div>
    </div>
  </div>
    
    `;
    return egresoHTML;
}
const eliminarEgreso = (id) => {

    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    // una vezx elminado cargamos el cabecero y el listado de ingresos
    cargarCabecero();
    cargarEgresos();

}

let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            // para converitr la cadeana de strig a numero utilizamos + o Number() y automaticamente se hace la convercion
            ingresos.push(new Ingreso(descripcion.value,Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
            forma.reset()
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value,+valor.value));
            cargarCabecero();
            cargarEgresos();
            forma.reset()
        }
    }else{
        alert('Ingreso los Datos solicitados')
    }

}
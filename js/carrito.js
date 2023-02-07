// CARRITO

let carrito = [];


// FUNCIONES


// OBTENER LOCAL STORAGE 

document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    pintarEntradasEnCarrito();

    if(activarFuncion){
        activarFuncion.addEventListener('click', procesarPago())    
    }
}) 



// AGREGAR ENTRADAS AL CARRITO DE COMPRAS

const contenedorObras = document.querySelector('#contenedorObras');

if(contenedorObras){
    contenedorObras.addEventListener('click', (e) =>{
        if(e.target.classList.contains('agregaACarrito')) {
            agregarEntradasAlCarrito(e.target.id) 
        }
    })
    }


const agregarEntradasAlCarrito = (obraId) => {

    
    const entradaAgregada = obras.find(obra => obra.id == obraId)

    if(carrito.some(prod => prod.id == obraId)){
        const index= carrito.findIndex(prod => prod.id == obraId)
        carrito[index].cantidad++

    } else{
        entradaAgregada.cantidad = 1; 
        carrito.push(entradaAgregada);
    }
    
    pintarEntradasEnCarrito()
    
}


// MOSTRAR ENTRADAS EN CARRITO (MODAL)

const pintarEntradasEnCarrito = () => {
    const contenedorCarrito = document.getElementById('carrito-contenedor');
    const precioTotal = document.getElementById('precioTotal'); 
    const totalEntradasEnCarrito = document.getElementById('cantidadTotal')

  
    
    if(contenedorCarrito){
        contenedorCarrito.innerHTML = '';
        carrito.forEach((obraElegida) => {
            const {id, sinopsis, img, titulo, fecha, precio, cantidad} = obraElegida
    
            const div = document.createElement('div')
            div.classList.add('entradasEnCarrito')
            div.innerHTML += `
               
            <table class="table">
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${titulo}</td>
                <td>$${precio} </td>
                <td class="text-center" id='cantidad${id}'>${cantidad}</td>
                <td><button class="btn waves-effect waves-light boton-eliminar" value="${id}">eliminar</button></td>
               </tr>
                </tbody>
          </table>
        `
            contenedorCarrito.appendChild(div);
        })

        if(carrito.length === 0){
            contenedorCarrito.innerHTML = `
            <p class="m-3 p-3 text-center">No hay entradas en el carrito de compras</p>
        `
        } 
  
        precioTotal.innerText = carrito.reduce((acumulador, elemento) => acumulador + (elemento.precio * elemento.cantidad), 0)
        totalEntradasEnCarrito.innerText = carrito.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0)
        

    guardarCarritoEnStorage(carrito);

    }
}


// ELIMINAR ENTRADAS DEL CARRITO

const modalCarrito = document.querySelector('.modal-content');

if(modalCarrito){
modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('boton-eliminar')){
        
        eliminarEntradasDelCarrito(e.target.value);
    }
})
}

const eliminarEntradasDelCarrito = (obraId) => {
    
    const entradaIndex = carrito.findIndex(obra => obra.id == obraId)
    carrito.splice(entradaIndex, 1)

    pintarEntradasEnCarrito()
}

const vaciarCarrito = document.querySelector('#vaciarCarrito')
    if(vaciarCarrito){
    vaciarCarrito.addEventListener('click', () => {
        carrito.length = [];
        pintarEntradasEnCarrito();  
        
    })
};

// GUARDAR CARRITO EN EL LOCAL STORAGE 

const guardarCarritoEnStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
};


// CONFIRMAR COMPRA

const confirmarCompra = document.getElementById('confirmarCompra')

    if(confirmarCompra){
    confirmarCompra.addEventListener('click', () => {
        
        if (carrito.length === 0) {
            Swal.fire({
                title: 'carrito vacío',
                text: 'Tienes que agregar entradas para continuar con la compra',
                icon: 'info',
                iconColor: '#0B0D0D',
                showConfirmButton: 'true',
                confirmButtonColor: '#87a2a1',
                width: 400,
                padding: '2em',
                color: '#0B0D0D',
                background: '#f4f1ed'
            })
        
        } else{
            location.href ='../pages/pago.html';       
            procesarPago()
            
        }
    })
}


// PROCESAR PAGO 

const procesarPago = () =>{
        
        carrito.forEach((entrada) =>{
            const tablaEntradas = document.querySelector('#tablaEntradas tbody')
            if(tablaEntradas){
            const{id, titulo, fecha, precio, cantidad} = entrada
    
            const tr = document.createElement('tr')
            tr.innerHTML += `
                
                    <td>${titulo}</td>
                    <td>$${precio}</td>
                    <td id="${id}">${cantidad}</td>
                    <td>$${precio * cantidad}</td>
                
            `
            tablaEntradas.appendChild(tr)

            }
            const totalPago = document.querySelector('#totalPago')
        
            totalPago.innerText = '$' + carrito.reduce((acumulador, elemento) => acumulador + (elemento.precio * elemento.cantidad), 0)      
        })
}

const activarFuncion = document.querySelector('#activarFuncion')
    if(activarFuncion){
    activarFuncion.addEventListener('click', procesarPago())    
}


// FORMULARIO DE PAGO - USO DE LIBRERIAS 

const formularioPago = document.querySelector('#formularioPago')

if(formularioPago){
    formularioPago.addEventListener('submit', enviarPedido)
}

function enviarPedido(e) {
    e.preventDefault()
    const nombreComprador = document.querySelector('#nombreComprador').value
    const correoComprador = document.querySelector('#correoComprador').value
    
    if(nombreComprador === '' || correoComprador === ''){
        Swal.fire({
            text: 'Debes completar tus datos personales para continuar con la compra',
            icon: 'error',
            iconColor: '#0B0D0D',
            showConfirmButton: 'true',
            confirmButtonColor: '#0B0D0D',
            width: 400,
            padding: '2em',
            color: '#0B0D0D',
            background: '#f4f1ed'
        }) 
    } else {
        formularioPago.reset()
        Swal.fire({
            text: 'Serás reenviado a una página segura para completar el pago',
            icon: 'success',
            iconColor: '#0B0D0D',
            showConfirmButton: 'true',
            confirmButtonColor: '#87a2a1',
            width: 400,
            padding: '2em',
            color: '#0B0D0D',
            background: '#f7f1f0'

        })
        localStorage.clear()
        
    }
}


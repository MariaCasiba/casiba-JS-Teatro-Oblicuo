
// PINTAR LAS OBRAS DESDE EL DOM EN LA PAGINA DE COMPRA DE ENTRADAS

const contenedor = document.querySelector('#contenedorObras');


const pintarObras = () => {

if(contenedor){
obras.forEach(obra => {
    const {id, img, titulo, fecha, precio, cantidad} = obra;

    const div = document.createElement('div');
        div.className = 'card mb-3';
        div.style.maxWidth = '540px';
        div.innerHTML += `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${img}" class="img-fluid rounded-start" alt="imagen de obra teatral">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title p-1" >${titulo}</h5>
                    <p class="card-text">${fecha}</p>
                    <p class="card-text">$ ${precio}</p>   
                    <button type="button" id="${id}" class="btn btn-outline-dark agregaACarrito" data-bs-toggle="modal"  data-bs-target="#exampleModal">
                    agregar al carrito
                    </button>
                </div>
            </div>
        </div>
        `
        contenedor.appendChild(div);
    
})
}
}


// USO DE UNA API PARA AGREGAR COMENTARIOS EN LA PAGINA

const comentarios = document.querySelector('.contenido');

if (comentarios) {
    const mostrarComentarios = () => {
        const tituloComentarios = document.createElement('h5')
        tituloComentarios.className = 'col-12 col-lg-12 m-4 p-2';
        tituloComentarios.innerText = 'Algunos comentarios de nuestros espectadores:'
        comentarios.appendChild(tituloComentarios)
    
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then((resp) => resp.json())
            .then(data => {
                data.forEach(comment => {
                    if (comment.id < 6) {
                    const ul = document.createElement('ul')
                    ul.className = 'col-12 col-lg-12 m-2';
                    ul.innerHTML = `
                        <li>"${comment.body}" '(${comment.name})'</li> 
                    `
                comentarios.appendChild(ul)
                }
                }
                );
            })
    }
    mostrarComentarios()
}


// PINTAR LAS OBRAS EN CARTELERA DESDE EL DOM

const cartelera = document.querySelector('.obras')


    if(cartelera){
        const pintarCartelera = () => {
        obras.forEach(obra => {

        const {id, img, titulo, fecha, precio, cantidad, sinopsis} = obra;

        const div = document.createElement('div')
        div.className = 'card bg-secundario text-center p-2 m-3'
        div.style.width = '26rem';
        div.innerHTML += `
            <img src="${img}" class="card-img-top animate__animated animate__fadeIn" alt="foto obra"></img>
            <div class="card-body">
                <h5 class="card-title fs-2 fw-bold">${titulo}</h5>
                <p class="card-text fs-5 p-2">${fecha}</p>

                <p>
                    <button class="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample${id}" aria-expanded="false" aria-controls="multiCollapseExample${id}" id="${id}">
                        sinopsis
                    </button>
                </p>
                <div class="collapse multi-collapse collapse-sinopsis" id="multiCollapseExample${id}">
                    <div class="card card-body">
                    ${sinopsis}
                    </div>
                </div>   
            </div>
        `
            cartelera.appendChild(div);   
    })
    }
    pintarCartelera()
    }
    


// USO DE LIBRERIAS

const mensajes = document.querySelector('#mensajes')

    if(mensajes){
    mensajes.addEventListener('submit', (e) => {
        const nombre  = document.querySelector('#nombre')
        e.preventDefault() 

        if(nombre.value.length <3 ){
            Toastify({
                text: "El nombre es demasiado corto; escribe tu nombre completo.",
                className: "warning",
                offset: {
                    x: 230, 
                    y: 250 
                },
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    color:'#0B0D0D',
                    background: '#f4f1ed'},
                onClick: function(){} 
            })  .showToast();

        } else{
            Swal.fire({
            text: 'mensaje enviado',
            icon: 'success',
            iconColor: '#0B0D0D',
            showConfirmButton: 'true',
            confirmButtonColor: '#87a2a1',
            width: 400,
            padding: '2em',
            color: '#0B0D0D',
            background: '#f4f1ed'
        }) 

        }      
        })   
}
    

document.addEventListener('DOMContentLoaded', pintarObras())




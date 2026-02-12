const cursos = document.querySelector('#lista-cursos')
const listaCarrito = document.querySelector('#lista-carrito tbody')
const BorrarCarrito = document.querySelector('#vaciar-carrito')
const table = document.querySelector('#carrito div')

let carrito = []

Eventos()
function Eventos () {
    cursos.addEventListener('click', (e) => {
        e.preventDefault()
        const producto = e.target.parentElement.parentElement
        if (e.target.classList.contains('agregar-carrito')) {
            Informacion(producto);
        }
    })

        listaCarrito.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.classList.contains('borrar-curso')) {
            const enlace = e.target.getAttribute('data-id')
            console.log(enlace)
            const indiceBorrado = carrito.findIndex(elemen => elemen.id === enlace)
            if (carrito[indiceBorrado].cantidad > 1) {
                carrito[indiceBorrado].cantidad--
                agregarCarrito();
            } else {
                carrito = carrito.filter(elementt => elementt.id !== enlace);
                agregarCarrito();
            }

        }
    })

    BorrarCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        carrito=[];
        agregarCarrito();
    })
};

function Informacion (prod) {


    const objetoDinamico = {
        imagen: prod.querySelector('img').src,
        titulo: prod.querySelector('h4').textContent,
        autor: prod.querySelector('p').textContent,
        precio: parseInt(prod.querySelector('p span').textContent.replace('$', '')), 
        id: prod.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    const indice = carrito.findIndex(prod => prod.id === objetoDinamico.id)
    if (indice >= 0) {
        carrito[indice].cantidad++
    } else {
        carrito = [...carrito, objetoDinamico]
    }

    agregarCarrito();

    console.log(carrito)
}

    function limpiaHTML () {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}

function agregarCarrito () {

        limpiaHTML();

        carrito.forEach(productico => {
        
        const fila = document.createElement('tr')
        fila.innerHTML = `
            <td><img src="${productico.imagen}" width="200"></td>
            <td>${productico.titulo}</td>
            <td>${productico.precio}</td>
            <td>${productico.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${productico.id}">X</a></td>
        `;
        listaCarrito.appendChild(fila);
    })
    const precioTotal = carrito.reduce((total, dolal) => {
            return total = total+dolal.precio*dolal.cantidad
        }, 0)
        if (precioTotal === 0) {
            table.innerText = `¡AÑADE AL CARRITO!`
        } else {
            table.innerText = `TOTAL: ${precioTotal}`
        }
    }
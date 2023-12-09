let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');

    listaCarrito.innerHTML = '';
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));
        li.appendChild(botonEliminar);
    });

    totalCarrito.textContent = `$${total.toFixed(2)}`;
    document.getElementById('carrito').textContent = `Carrito (${carrito.length})`;
}

function realizarCompra() {
    alert('Gracias por tu compra!');
    carrito = [];
    total = 0;
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

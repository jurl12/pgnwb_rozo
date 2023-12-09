let carrito = [];
let total = 0;


function actualizarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');

    // Limpiar el contenido actual del carrito
    listaCarrito.innerHTML = '';

    // Iterar sobre los productos en el carrito
    carrito.forEach((producto, index) => {
        // Crear un nuevo elemento de lista (li) para cada producto
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;

        // Crear un botón para eliminar el producto del carrito
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));

        // Agregar el botón al elemento de lista
        li.appendChild(botonEliminar);

        // Agregar el elemento de lista al carrito
        listaCarrito.appendChild(li);
    });

    // Actualizar el total del carrito
    totalCarrito.textContent = `$${total.toFixed(2)}`;

    // Actualizar el contador de productos en el encabezado
    document.getElementById('carrito').textContent = `Carrito (${carrito.length})`;
}

window.onload = function () {
    cargarCarritoDesdeLocalStorage();
    actualizarCarrito();
};

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('miCarrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        recalcularTotal();
    }
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('miCarrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    recalcularTotal();
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function recalcularTotal() {
    total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
}

function realizarCompra() {
    alert('Gracias por tu compra!');
    limpiarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
    guardarCarritoEnLocalStorage(); // Actualiza el localStorage cuando se vacía el carrito
}

// Resto del código...

// Agrega esta línea para cargar el carrito desde localStorage al cargar la página
cargarCarritoDesdeLocalStorage();


function filtrarPorNombre() {
    var inputNombre = document.getElementById('filtroNombre').value.toUpperCase();
    var productos = document.getElementsByClassName('producto');

    for (var i = 0; i < productos.length; i++) {
        var nombre = productos[i].getElementsByTagName('h3')[0].innerText.toUpperCase();
        if (nombre.includes(inputNombre)) {
            productos[i].style.display = 'block';
        } else {
            productos[i].style.display = 'none';
        }
    }
}

function filtrarPorCategoria() {
    var categoriaSeleccionada = document.getElementById('filtroCategoria').value;
    var productos = document.getElementsByClassName('producto');

    for (var i = 0; i < productos.length; i++) {
        var categoriaProducto = productos[i].getElementsByTagName('a')[0].getAttribute('href').replace('.html', '').toUpperCase();
        if (categoriaSeleccionada === 'todos' || categoriaProducto.includes(categoriaSeleccionada.toUpperCase())) {
            productos[i].style.display = 'block';
        } else {
            productos[i].style.display = 'none';
        }
    }
}
function ordenarPorPrecio(order) {
    var productos = Array.from(document.getElementsByClassName('producto'));
    productos.sort((a, b) => {
        var precioA = parseFloat(a.getElementsByTagName('p')[1].innerText.split('$')[1]);
        var precioB = parseFloat(b.getElementsByTagName('p')[1].innerText.split('$')[1]);
        if (order === 'asc') {
            return precioA - precioB;
        } else {
            return precioB - precioA;
        }
    });

    var contenedorProductos = document.querySelector('.todo');
    productos.forEach(producto => contenedorProductos.appendChild(producto));
}

function abrirVentanaModal() {
    document.getElementById("miVentanaModal").style.display = "block";
  }
  
  function cerrarVentanaModal() {
    document.getElementById("miVentanaModal").style.display = "none";
  }
  function crearNuevoElemento() {
    const nombre = document.getElementById('nombreNuevoElemento').value;
    const precio = parseFloat(document.getElementById('precioNuevoElemento').value);
    agregarAlCarrito(nombre, precio); // Utiliza la función existente para agregar el elemento al carrito
    cerrarVentanaModal(); // Cierra la ventana modal después de agregar el producto
    actualizarCarrito(); // Asegúrate de llamar a esta función para actualizar la visualización del carrito
}
  function guardarProducto() {
    const nombre = document.getElementById('nombreProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const descripcion = document.getElementById('descripcionProducto').value;
  
    agregarAlCarrito(nombre, precio); // Agrega el producto al carrito
    actualizarCarrito(); // Asegúrate de actualizar la visualización del carrito
  
    cerrarVentanaModal(); // Cierra la ventana modal después de guardar el producto
  }
  function limpiarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

  
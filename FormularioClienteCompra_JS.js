document.addEventListener('DOMContentLoaded', () => {
  // Obtén el elemento del formulario donde se enviarán los datos del pedido
  const form = document.getElementById('FormularioCliente');

  // Recupera los datos del carrito almacenados en el almacenamiento local
  const carritoJSON = localStorage.getItem('carrito');
  if (carritoJSON) {
    const carrito = JSON.parse(carritoJSON);

    // Muestra los productos del carrito en la tabla del formulario
    const carritoBody = document.getElementById('carrito-body');
    const totalAPagar = document.getElementById('total-a-pagar');
    carritoBody.innerHTML = '';

    Object.values(carrito).forEach(producto => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad * parseFloat(producto.precio.replace('$', ''))}</td>
      `;
      carritoBody.appendChild(fila);
    });

    // Calcular y mostrar el precio total
    let precioTotal = 0;
    Object.values(carrito).forEach(producto => {
      precioTotal += producto.cantidad * parseFloat(producto.precio.replace('$', ''));
    });
    console.log("Antes de establecer el contenido de totalAPagar:", totalAPagar);
    totalAPagar.textContent = `$${precioTotal.toFixed(2)}`;
    console.log("Después de establecer el contenido de totalAPagar:", totalAPagar);

    // Limpia el almacenamiento local después de mostrar los datos
    localStorage.removeItem('carrito');

    // Agrega un evento de escucha para manejar el envío del formulario
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Obtiene los datos del formulario de cliente
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const telefono = document.getElementById('telefono').value;
      const direccion = document.getElementById('direccion').value;
      const id = document.getElementById('id').value;

      // Crea un objeto con los datos del pedido y los productos del carrito

const pedido = {
  nombre,
  email,
  telefono,
  direccion,
  id,
  productos: carrito,
};

// Envía el pedido 
fetch('http://localhost:8000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(pedido), // Aquí se convierte a JSON
})
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al enviar la orden.');
          }
        })
        .then(data => {
          // Respuesta del servidor
          console.log('Orden creada con éxito:', data);
        })
        .catch(error => {
          
          console.error('Error:', error);
        });

      // Restablece el formulario después de enviar los datos
      form.reset();
    });
  } else {
    // Manejar el caso en el que el carrito no está definido en el almacenamiento local
    console.error('El carrito está vacío o no está definido en el almacenamiento local.');
  }
});
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

items.addEventListener('click', e => {
    estado(e)
})

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try{
        const res = await fetch('https://restaurante-vrr-pnt20232-unisabana.onrender.com/api/orders')
        const data = await res.json()
        pintarCards(data)
    } catch(error) {
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre
        templateCard.querySelector('h4').textContent = producto.id
        templateCard.querySelector('h2').textContent = producto.estado
        templateCard.querySelector('p').textContent = producto.productos
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

}

const estado = async e  => {
    
    const id = templateCard.querySelector('.btn-dark').dataset.id
    const respuesta=`https://restaurante-vrr-pnt20232-unisabana.onrender.com/api/orders/${id}/updateEstado`;
    const response = await fetch(respuesta ,{method: 'PUT'});
    const json= await response.json();
    console.log(templateCard.querySelector('.btn-dark').dataset.id)
    location.reload();
}

function cerrarsecion(){
    console.log("hola")

}
document.addEventListener("DOMContentLoaded", function() {
    // Obtén el botón por su clase
    var botonCerrarSesion = document.querySelector(".LogOut");

    // Agrega un evento de clic al botón
    botonCerrarSesion.addEventListener("click", function() {
        // Redirige a la página "forcontacto"
        window.location.href = "forcontacto.html";
    });
});




const btn = document.querySelector('#btn');
const btn1 = document.querySelector('#btn1');
const formulario = document.querySelector('#formulario');
const respuesta = document.querySelector('#respuesta');



const getData = () => {
  const datos = new FormData(formulario);
  const datosProcesados = Object.fromEntries(datos.entries());
  formulario.reset();
  

  username=datosProcesados['USER'];

  password=datosProcesados['PW'];

  const respuesta=`${username}:${password}`;

  return respuesta;

}



/*Funcion para colocar los datos en el Servidor */

const login = async () => {

  
  const newUser = getData();

  try {
    const response = await fetch('https://restaurante-vrr-pnt20232-unisabana.onrender.com/api/login', {
      
      method: 'POST',
       
      headers: { 'Authorization': 'Basic ' + btoa(newUser)}
    });

    const json= await response.json();
    if(json == "Esta autorizado"){
      window.location.href = "Pedidos.html"
    }else{
      window.alert("hola")
    }
   

  } catch (error) {
    console.log(error);
  }

}

btn.addEventListener('click', (event) => {
  event.preventDefault();
  login();
})
//access token, se usa para conectarse con el app de MP

//PASO 1, CREAR PREFERENCIA https://www.mercadopago.com.ar/developers/es/reference/preferences/_checkout_preferences/post

//const token = 'APP_USR-6069055284609461-122813-6491c7444cb44cf068cd98d583509173-1274805054'



const dataProductos = [
    {
        id: 1,
        nombre: 'Caja',
        cantidad: 10,
        precio: 1500,
        imagen: 'https://res.cloudinary.com/da5fzpyjp/image/upload/v1672265832/E-COMMERS%20NAVIDAD/caja_pifqdg.webp'
    },
    {
        id: 2,
        nombre: 'Trineo',
        cantidad: 35,
        precio: 3000,
        imagen: 'https://res.cloudinary.com/da5fzpyjp/image/upload/v1672271116/E-COMMERS%20NAVIDAD/trineo_vczfjp.webp'
    },  
    {
        id: 3,
        nombre: 'Gemmi',
        cantidad: 23,
        precio: 7500,
        imagen: 'https://res.cloudinary.com/da5fzpyjp/image/upload/v1672270784/E-COMMERS%20NAVIDAD/gemmy_oueo5q.webp'
    },  
    {
        id: 4,
        nombre: 'Caballo',
        cantidad: 70,
        precio: 6000,
        imagen: 'https://m.media-amazon.com/images/I/61NPgHyya9L._AC_UL480_FMwebp_QL65_.jpg'
    },  
    {
        id: 5,
        nombre: 'Renos',
        cantidad: 7,
        precio: 3500,
        imagen: 'https://res.cloudinary.com/da5fzpyjp/image/upload/v1672270994/E-COMMERS%20NAVIDAD/renos_yctnl1.webp'
    },
    {
        id: 6,
        nombre: 'Snoopy',
        cantidad: 7,
        precio: 2500,
        imagen: 'https://res.cloudinary.com/da5fzpyjp/image/upload/v1672270915/E-COMMERS%20NAVIDAD/snoopy_g6mceq.webp'
    },
    {
        id: 1,
        nombre: 'Caja',
        cantidad: 10,
        precio: 1500,
        imagen: 'https://res.cloudinary.com/da5fzpyjp/image/upload/v1672265832/E-COMMERS%20NAVIDAD/caja_pifqdg.webp'
    },
    {
        id: 2,
        nombre: 'Trineo',
        cantidad: 35,
        precio: 3000,
        imagen: 'https://res.cloudinary.com/da5fzpyjp/image/upload/v1672271116/E-COMMERS%20NAVIDAD/trineo_vczfjp.webp'
    },  
    {
        id: 3,
        nombre: 'Gemmi',
        cantidad: 23,
        precio: 7500,
        imagen: 'https://res.cloudinary.com/da5fzpyjp/image/upload/v1672270784/E-COMMERS%20NAVIDAD/gemmy_oueo5q.webp'
    },  
    {
        id: 4,
        nombre: 'Caballo',
        cantidad: 70,
        precio: 6000,
        imagen: 'https://m.media-amazon.com/images/I/61NPgHyya9L._AC_UL480_FMwebp_QL65_.jpg'
    },  
    {
        id: 5,
        nombre: 'Renos',
        cantidad: 7,
        precio: 3500,
        imagen: 'https://res.cloudinary.com/da5fzpyjp/image/upload/v1672270994/E-COMMERS%20NAVIDAD/renos_yctnl1.webp'
    },
    {
        id: 6,
        nombre: 'Snoopy',
        cantidad: 7,
        precio: 2500,
        imagen: 'https://res.cloudinary.com/da5fzpyjp/image/upload/v1672270915/E-COMMERS%20NAVIDAD/snoopy_g6mceq.webp'
    },
];

let data = []

if (localStorage.getItem('data')) {
    data = JSON.parse(localStorage.getItem('data'));
} else {
    data = dataProductos;
}

class Carrito {
    constructor(id, nombre, cantidad, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.imagen = imagen;
        this.total = precio * cantidad;
    }
}


 //se guardaran los productos para luego dibujar
let carrito = [];

/* -------------------------------------------------------------------------- */
/*                                 Constantes                                 */
/* -------------------------------------------------------------------------- */

const contenedor = document.getElementById('contenedor');
const contenedorCarrito = document.getElementById('contenedor-carrito');
const carritoError = document.getElementById('carrito-error');
const contenedorTotal = document.getElementById('total');
const botonVaciar = document.getElementById('carrito-acciones-vaciar');
const numerito = document.getElementById('numerito');


/* -------------------------------------------------------------------------- */
/*                                Agregar productos                           */
/* -------------------------------------------------------------------------- */

let imgSelected = " ";
let idProduct = data.length; //
console.log(idProduct)

const newProduct = document.getElementById('new-product');
const newPrice = document.getElementById('new-price');
const newImage = document.getElementById('new-image');
const btnNewProduct = document.getElementById('btn-new-create');

newImage.addEventListener('change', importImg);
btnNewProduct.addEventListener('click', createNewProduct);

/* function importImg(event) {
  const currentImg = event.target.files[0];
  const objectURL = URL.createObjectURL(currentImg);
  console.log(currentImg)
  console.log(objectURL)
  imgSelected = objectURL;
} */

function importImg(event) {
    let fr = new FileReader(); // uso de la api filereader
    fr.readAsDataURL(event.target.files[0])
    fr.addEventListener('load',() => {
        imgSelected = fr.result;
        console.log(fr.result)
    })}

function createNewProduct() {
  idProduct++;
  const titleProduct = newProduct.value;
  console.log(titleProduct)
  const priceProduct = newPrice.value;
  console.log(priceProduct)
  const id = idProduct;

  const newFruit = {id:id, nombre: titleProduct, precio: priceProduct, imagen: imgSelected};

  if (id === id) {

    if (data.some(el => el.id === id)) {
        const target = data.find(el => el.id === id);
        console.log(target)
        data = data.filter(el => el.id !== id);
        console.log(data)
    }

    const nuevoNewFruit = {id:id, nombre: titleProduct, precio: priceProduct, imagen: imgSelected};
    data.push(nuevoNewFruit)
  } else {
    data.push(newFruit);
    console.log(newFruit)

  }

  console.log(data)
  dibujarProductos(data, contenedor)
  
}



//2//dibujar productos en html, recibe como parametros a evaluar array productos y contenedor
    //img-fluid w-100
const dibujarProductos = (data, contenedor) => {
    let acumulador = '';
    data.forEach(element => {
        acumulador += `
        
        <div class=  "card mx-auto text-bg-secondary"  style="width: 15rem;"  >
       
        <div class="cont-img">
        
            <img class ="img-main" src="${element.imagen}" class="card-img-top" alt="${element.nombre}.">
        </div>
            <div class="card-body">
                <h5 class="card-title">${element.nombre}</h5>
                <p class="card-text">Cantidad: ${element.cantidad}</p>
                <p class="card-text">Precio: $${element.precio}</p>
                <a href="#" onclick="agregarAlCarrito(${element.id})" class="btn btn-primary">Comprar</a>
            </div>
        </div>
        
          `
        });
        contenedor.innerHTML = acumulador;
        const dibujarProductos = (data, contenedor) => {
            let acumulador = '';
            data.forEach(element => {
                acumulador += `
                
                <div class=  "card mx-auto text-bg-secondary"  style="width: 15rem;"  >
               
                <div class="cont-img">
                
                    <img class ="img-main" src="${element.imagen}" class="card-img-top" alt="${element.nombre}.">
                </div>
                    <div class="card-body">
                        <h5 class="card-title">${element.nombre}</h5>
                        <p class="card-text">Cantidad: ${element.cantidad}</p>
                        <p class="card-text">Precio: $${element.precio}</p>
                        <a href="#" onclick="agregarAlCarrito(${element.id})" class="btn btn-primary">Comprar</a>
                    </div>
                </div>
                
                  `
                });
                contenedor.innerHTML = acumulador;    
               
        };
        
        localStorage.setItem('data',JSON.stringify(data))
        
};


//3//-despues de click en COMPRAR se agregan los prod al carrito (modal)
const agregarAlCarrito = (id) => {
    
    //busca elemento id que debe ser igual a al valor de la variable id
    const producto = data.find(el => el.id === id)
    
    if (producto) {

        const productoCarrito = new Carrito(producto.id, producto.nombre, 1, producto.precio, producto.imagen); 

        if (carrito.some(el => el.id === id)) {
            const target = carrito.find(el => el.id === id);
            carrito = carrito.filter(el => el.id !== id);

            const nuevoProducto = new Carrito(target.id, target.nombre, target.cantidad + 1, target.precio, target.imagen);
            carrito.push(nuevoProducto)
        } else {
            carrito.push(productoCarrito);
        }
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se a añadido al carrito',
            showConfirmButton: false,
            timer: 1500,
          })
    }
      
    console.log(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito)); //localStorage.setItem() metodo para almacenar en el navegador como una cadeja JSON. 'JSON.stringify(carrito) se utiliza para convertir el objeto JS en JSON
    listarCarrito(carrito)
    actualizarTotal()
    
}


const listarCarrito = (carrito) => {
    console.log('vacio')
    if(carrito.length === 0) {
        contenedorCarrito.innerText = "carrito vacio"
        console.log('carrito vacio')
        return;  
    }
    let acumulador = '';

    carrito.forEach((producto) => {
        acumulador += `
        <tr>
            <td class="align-middle align-center" >${producto.nombre}</td>
            <td class="align-middle">$${producto.precio}</td>
            <td id="amount" value="" class="align-middle">${producto.cantidad}
            <td class="align-middle">$${producto.total}</td>
            <td class="align-middle" >
            <button onclick="eliminarProducto(${producto.id})" type="button" class="btn btn-light">❌</button>  
            </td>
            <td class="align-middle">
            <div>
            <img class="img-fluid img-carrito" src="${producto.imagen}"/>
            </div>
            </td>
        </tr>
        `

    })

    contenedorCarrito.innerHTML = acumulador;
    actualizarNumerito() 
    
     

};




const eliminarProducto = (productoid) => {
    const item = carrito.findIndex((producto) => producto.id === productoid)
    console.log(item)
    carrito[item].cantidad--;
    console.log(carrito)
    if (carrito[item].cantidad === 0) {
    const nuevaLista = carrito.filter( (producto) => producto.id !== productoid)
    carrito = nuevaLista;
    console.log(carrito)
}
Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: 'Se a eliminado del carrito',
    showConfirmButton: false,
    timer: 1500
  })

listarCarrito(carrito);
actualizarTotal();
actualizarNumerito() 
localStorage.setItem('carrito', JSON.stringify(carrito));
    
} 


//vaciar carrito

botonVaciar.addEventListener('click', () => {
    carrito.length = []
    localStorage.removeItem('carrito')
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El carrito esta vacío',
        showConfirmButton: false,
        timer: 1500,
      })
    listarCarrito(carrito);
    actualizarTotal();
    actualizarNumerito() 
} )


dibujarProductos(data, contenedor)
listarCarrito(carrito);


//calculando total del monto a pagar, metodo reduce() itera a tarves de cada elemento en la matriz carrito y realiza un calculo en el

function actualizarTotal() {
    const totalCalculado = carrito.reduce( (acc, producto) => acc + (producto.precio * producto.cantidad), 0);  //la multiplicacion se a;ade al acc que es el costo totald e todos los produc.
    total.innerText = `Total: $${totalCalculado}`
}

//numerito

function actualizarNumerito() {
    let nuevoNumerito = carrito.reduce( (acc, producto) => acc + producto.cantidad,0);
    numerito.innerText = nuevoNumerito;
}


//recuperando del storage


if (localStorage.getItem('carrito')) {  //comprueba si hay una clave llamada 'carrito' en el local
    //json.parse(), transforma de cadena a objetoJS y dicho objeto se asignara a 'carrito'
    carrito = JSON.parse(localStorage.getItem('carrito'));
    listarCarrito(carrito)
    actualizarTotal()
}

if (localStorage.getItem ('data')) {
   const consultasViejas = JSON.parse(localStorage.getItem('data'));

   consultasViejas.forEach( (el) => {
        (el.id, el.nombre, el.cantidad, el.imagen, el.precio);
        console.log(consultasViejas);
    })
    dibujarProductos(consultasViejas,contenedor)
}


/* -------------------------------------------------------------------------- */
/*                                 Buscador interactivo                       */
/* -------------------------------------------------------------------------- */

iconSearch = document.getElementById('icon-search')
bars_search = document.getElementById('ctn-bars-search');
cover_ctn_search = document.getElementById('cover-ctn-search');
inputSearch = document.getElementById('inputSearch');
box_search =document.getElementById('box-search')

  //funcion para mostrar el buscardor
  document.getElementById("icon-search").addEventListener("click", mostrar_buscador);

  function mostrar_buscador(){
    bars_search.style.top = "80px";
    cover_ctn_search.style.display = "block";
    inputSearch.focus();

    if (inputSearch.value === ""){
        box_search.style.display = "none";
    }

}


  /* iconSearch.addEventListener('click', () => {
    bars_search.style.top = "80px";
    cover_ctn_search.style.display = "block";
    inputSearch.focus();  //para poder escribir en la barra

    if (inputSearch.value === "") {
        box_search.style.display = "none"
    }
  }) */

 //funcion para ocultar el buscador

 document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador)

 function ocultar_buscador() {
    bars_search.style.top = "-10px";
    cover_ctn_search.style.display = "none";
    inputSearch.value = "";
    box_search.style.display = "none";
 }


 
 /* cover_ctn_search.addEventListener('click', () => {
   bars_search.style.top = "-10px"; //click en covertor se esconde el buscador
   cover_ctn_search.style.display = "none"; //desaparece el covertor
   inputSearch.value = "";
   box_search.style.display = "none";
 }) */



 //creando filtrado de busqueda

 inputSearch.addEventListener('keyup', () => {
  //convertir el valor del input en mayuscula
  filter = inputSearch.value.toUpperCase();
  //li sera igual a los li que se obtiene del getelementbytagname
  li = box_search.getElementsByTagName("li") //

  //recorriendo elementos a filtrar mediante los "li"
  for (i = 0; i < li.length; i++){ //i arranca en 0, si i es menor a la longitud del objeto li el bucle incrementara 1 e interara atraves de todos los elementos de li

    a = li[i].getElementsByTagName("a")[0]; // se utiliza para acceder al primer elemento <a></a> dentro del li. Devuelte HTMLcollection de todos los a. [0], se utiliza para acceder al primer elemento de la coleccion
    textValue = a.textContent

    if(textValue.toUpperCase().indexOf(filter) > -1){ //si el valor ingresado en el buscador se encuentra en el texValue (li->a) el indexof devolvera un numero positivo

        li[i].style.display = "";
        box_search.style.display = "block";

        if (inputSearch.value === ""){   //si el biscador no tiene texto no se abre el box
            box_search.style.display = "none";
        }

    }else{  //sino hay conincidencias no mostrara nada el box
        li[i].style.display = "none";
    }
}
 });








//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCaritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
// Accion de agregar producto al pulsar "Agregar al Carrito".
    listaCursos.addEventListener('click', agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar el carrito
    vaciarCaritoBtn.addEventListener('click', () =>{
        console.log('vaciando carrito...')
        articulosCarrito = [];//Reseteamos el arreglo
        limpiarHTML();//Eliminamos todo el HTML
    })
};

//Funciones
function agregarCurso(e){
    e.preventDefault();
    
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
};

//Elimina curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo articulosCarrito por iD
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHtml(); //Iteramos sobre el carrito HTML para quitar de la lista.
    }
};

//Lee contenido HTML + Extrae info de producto
function leerDatosCurso(curso){
    //Objeto contenido curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe) {
        //Actualizamos la cantidad
        curso = articulosCarrito = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna Objeto Actualizados
            }else {
                return curso; //Retorna Objetos no duplicados
            }
        })
        articulosCarrito = [...curso]
    } else {
        //Agregamos curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    carritoHtml();
};

//Muestra carrito en HTML
function carritoHtml(){
    //Limpiar HTML
    limpiarHTML();
    //Recorre carrito y genera HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row  = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        
        //Agrega elemento de carrito en TBODY
        contenedorCarrito.appendChild(row);
    });
};

//Elimina los articulos del body
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};


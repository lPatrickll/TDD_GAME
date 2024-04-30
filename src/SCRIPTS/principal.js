// Importa las clases necesarias
import ArrayProyectos from "../OBJETOS/proyectosArray";
import Proyecto from "../OBJETOS/proyecto";

// Crea una instancia de ArrayProyectos
const arrayProyectos = new ArrayProyectos();

// Obtiene referencias a los elementos HTML
const btnAddProyecto = document.getElementById('btnAniadirProyecto');
const proyectoForm = document.getElementById('proyectoForm');
const inputTitulo = document.getElementById('inputTitulo');
const btnConfirmProyecto = document.getElementById('btnConfirmProyecto');
const proyectoContainer = document.getElementById('proyectoContainer');
const mensajeError = document.getElementById('mensajeError');


let estilo = "none";

// Evento al hacer clic en "Añadir Proyecto"
btnAddProyecto.addEventListener('click', () => {
    btnAddProyecto.style.display = 'none'; // Ocultar el botón "Añadir proyecto"
    proyectoForm.style.display = 'block';
});

// Evento al hacer clic en "Confirmar Proyecto"
btnConfirmProyecto.addEventListener('click', () => {
    const tituloProyecto = inputTitulo.value;
    if (tituloProyecto) {
        arrayProyectos.aniadirProyecto(tituloProyecto);
        inputTitulo.value = '';
        proyectoForm.style.display = 'none';
        actualizarProyectosEnPantalla();
        // Mostrar mensaje de éxito y botón "Aceptar"
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Proyecto añadido con éxito';
        const acceptButton = document.createElement('button');
        acceptButton.textContent = 'Aceptar';
        acceptButton.addEventListener('click', () => {
            proyectoContainer.removeChild(successMessage);
        });
        successMessage.appendChild(acceptButton);
        proyectoContainer.appendChild(successMessage);
        // Restaurar la visibilidad del botón "Añadir proyectos"
        btnAddProyecto.style.display = 'block';
        // Ocultar y restablecer el mensaje de error
        mensajeError.textContent = '';
        mensajeError.style.display = 'none';
    } else {
        mensajeError.textContent = 'Por favor ingrese un título para el proyecto.';
        mensajeError.style.display = 'block';
    }
});

// Función para actualizar la lista de proyectos en pantalla
function actualizarProyectosEnPantalla() {
    proyectoContainer.innerHTML = '';
    const proyectos = arrayProyectos.getProyectos();
    proyectos.forEach(proyecto => {
        // Crea un elemento div para mostrar el nombre del proyecto
        const proyectoElement = document.createElement('div');
        proyectoElement.textContent = proyecto;

        // Crea un botón para ingresar al proyecto
        const btnIngresarProyecto = document.createElement('button');
        btnIngresarProyecto.textContent = 'Ingresar';
        btnIngresarProyecto.addEventListener('click', () => {
            // Aquí puedes agregar la lógica para ingresar al proyecto
            estilo = "none";
            ingresarAlProyecto(proyecto);
        });
        proyectoElement.appendChild(btnIngresarProyecto);

        // Botón para borrar el proyecto
        const btnBorrarProyecto = document.createElement('button');
        btnBorrarProyecto.textContent = 'Borrar Proyecto';
        btnBorrarProyecto.addEventListener('click', () => {
            const confirmacion = window.confirm('¿Estás seguro de que deseas borrar este proyecto?');
            if (confirmacion) {
                arrayProyectos.borrarProyecto(proyecto);
                actualizarProyectosEnPantalla(); // Actualiza la lista de proyectos en pantalla
            }
        });
        proyectoElement.appendChild(btnBorrarProyecto);

        proyectoContainer.appendChild(proyectoElement);
    });
}

// Función para ingresar a un proyecto específico
function ingresarAlProyecto(nombreProyecto) {
    // Encuentra el proyecto en el array de proyectos
    const proyectoSeleccionado = arrayProyectos.proyectosArray.find(proyecto => proyecto.getTitulo() === nombreProyecto);
    if (proyectoSeleccionado) {
        // Lógica para ingresar al proyecto, por ejemplo, mostrar los commits y el formulario de ingreso de commits
        proyectoContainer.innerHTML = ''; // Limpiar el contenedor de proyectos
        const tituloProyectoElement = document.createElement('h2');
        tituloProyectoElement.textContent = `Proyecto: ${nombreProyecto}`;
        proyectoContainer.appendChild(tituloProyectoElement);

        // Botón para volver a la lista de proyectos
        const btnVolver = document.createElement('button');
        btnVolver.textContent = 'Volver a la lista de proyectos';
        btnVolver.addEventListener('click', () => {
            actualizarProyectosEnPantalla(); // Vuelve a mostrar la lista de proyectos
        });
        proyectoContainer.appendChild(btnVolver);

        // Mostrar los commits del proyecto
        const listaCommits = document.createElement('ul');
        const commitsProyecto = proyectoSeleccionado.mostrarCommits();
        commitsProyecto.forEach(commit => {
            const commitItem = document.createElement('li');
            commitItem.textContent = `Pruebas: ${commit.cantPruebas}, Líneas: ${commit.cantLineas}, Cobertura: ${commit.cobertura}%`;
            listaCommits.appendChild(commitItem);
        });
        proyectoContainer.appendChild(listaCommits);

        // Formulario para ingresar un nuevo commit
        const formCommit = document.createElement('form');
        const inputCantPruebas = document.createElement('input');
        inputCantPruebas.type = 'number';
        inputCantPruebas.placeholder = 'Cantidad de pruebas';
        const inputCantLineas = document.createElement('input');
        inputCantLineas.type = 'number';
        inputCantLineas.placeholder = 'Cantidad de líneas';
        const inputCobertura = document.createElement('input');
        inputCobertura.type = 'number';
        inputCobertura.placeholder = 'Cobertura (%)';
        const btnConfirmCommit = document.createElement('button');
        btnConfirmCommit.textContent = 'Agregar Commit';
        // Mensaje de confirmacion
        const successCommit = document.createElement('div');
        successCommit.textContent = 'Commit añadido con exito';
        const acceptCommit = document.createElement('button');
        acceptCommit.textContent = 'Aceptar';
        successCommit.style.display = estilo;
        acceptCommit.addEventListener('click', () => {
            proyectoContainer.removeChild(successCommit);
        });
        successCommit.appendChild(acceptCommit);
        proyectoContainer.appendChild(successCommit);
        // *************************************************
        btnConfirmCommit.addEventListener('click', () => {
            const cantPruebas = parseInt(inputCantPruebas.value);
            const cantLineas = parseInt(inputCantLineas.value);
            const cobertura = parseInt(inputCobertura.value);
            if (!isNaN(cantPruebas) && !isNaN(cantLineas) && !isNaN(cobertura)) {
                proyectoSeleccionado.aniadirCommit(cantPruebas, cantLineas, cobertura);
                estilo = "block";
                ingresarAlProyecto(nombreProyecto); // Actualiza la lista de commits en pantalla
            } else {
                // Muestra un mensaje de error si los campos no son números válidos
                const errorMensaje = document.createElement('div');
                errorMensaje.textContent = 'Por favor ingrese valores numéricos válidos.';
                proyectoContainer.appendChild(errorMensaje);
                estilo = "none";
                ingresarAlProyecto(nombreProyecto); // Actualiza la lista de commits en pantalla
            }
        });
        formCommit.appendChild(inputCantPruebas);
        formCommit.appendChild(inputCantLineas);
        formCommit.appendChild(inputCobertura);
        formCommit.appendChild(btnConfirmCommit);
        proyectoContainer.appendChild(formCommit);
    }
}

// Actualiza la lista de proyectos al cargar la página
actualizarProyectosEnPantalla();

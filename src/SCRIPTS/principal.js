import ArrayProyectos from "../OBJETOS/proyectosArray";
import crearElemento from "./crearElemento";

const arrayProyectos = new ArrayProyectos();

// Obtiene referencias a los elementos HTML
const btnAddProyecto = document.getElementById('btnAniadirProyecto');
const proyectoForm = document.getElementById('proyectoForm');
const inputTitulo = document.getElementById('inputTitulo');
const btnConfirmProyecto = document.getElementById('btnConfirmProyecto');
const proyectoContainer = document.getElementById('proyectoContainer');
const mensajeError = document.getElementById('mensajeError');


let estilo = "none";
let estiloCommit = "none";

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
        let successMessage = crearElemento("div", "Proyecto añadido con éxito");
        let acceptButton = crearElemento("button", "Aceptar")

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

        const proyectoElement = crearElemento("div", proyecto);
        const btnIngresarProyecto = crearElemento("button", "Ver Commits");
        btnIngresarProyecto.addEventListener('click', () => {
            // Aquí puedes agregar la lógica para ingresar al proyecto
            estilo = "none";
            estiloCommit = "none";
            ingresarAlProyecto(proyecto);
        });
        proyectoElement.appendChild(btnIngresarProyecto);

        // Botón para ver puntaje de el proyecto

        const btnPuntajeProyecto = crearElemento("button", "Puntaje Proyecto");
        btnPuntajeProyecto.addEventListener('click', () => {
            // Aquí puedes agregar la lógica para ingresar al proyecto
            estilo = "none";
            estiloCommit = "none";
            ingresarPuntajeProyecto(proyecto);
        });
        proyectoElement.appendChild(btnPuntajeProyecto);

        // Botón para borrar el proyecto

        const btnBorrarProyecto = crearElemento("button", "Borrar Proyecto");
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

// ****************************************************************************************************************************************************
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

        // Mensaje de confirmacion
        const ultimoCommitBorrado = document.createElement('div');
        ultimoCommitBorrado.textContent = 'Ultimo commit borrado correctamente';
        const acceptCommitBorrado = document.createElement('button');
        acceptCommitBorrado.textContent = 'Aceptar';
        ultimoCommitBorrado.style.display = estiloCommit;
        acceptCommitBorrado.addEventListener('click', () => {
            proyectoContainer.removeChild(ultimoCommitBorrado);
        });
        ultimoCommitBorrado.appendChild(acceptCommitBorrado);
        proyectoContainer.appendChild(ultimoCommitBorrado);

        // Botón para volver a la lista de proyectos
        const btnVolver = document.createElement('button');
        btnVolver.textContent = 'Volver a la lista de proyectos';
        btnVolver.addEventListener('click', () => {
            actualizarProyectosEnPantalla(); // Vuelve a mostrar la lista de proyectos
        });
        proyectoContainer.appendChild(btnVolver);

        // Mostrar los commits del proyecto
        const listaCommits = document.createElement('ul');
        const commitsProyecto = proyectoSeleccionado.mostrarCommitsConPruebasAprob();

        // Verifica si hay al menos un commit en el proyecto antes de mostrar el botón "Eliminar Último Commit"
        if (commitsProyecto.length > 0) {
            // Botón para eliminar el último commit
            const btnEliminarUltimoCommit = document.createElement('button');
            btnEliminarUltimoCommit.textContent = 'Eliminar Último Commit';
            btnEliminarUltimoCommit.addEventListener('click', () => {
                // Oculta el botón "Eliminar Último Commit"
                btnEliminarUltimoCommit.style.display = 'none';
                // Crea un mensaje de confirmación
                const confirmMessage = document.createElement('div');
                confirmMessage.style.color = 'red';
                confirmMessage.textContent = '¿Está seguro de que desea eliminar el último commit?';
                // Crea un botón de confirmación en rojo
                const btnConfirmar = document.createElement('button');
                btnConfirmar.textContent = 'Confirmar';
                btnConfirmar.style.backgroundColor = 'red';
                btnConfirmar.addEventListener('click', () => {
                    estilo = 'none';
                    proyectoSeleccionado.eliminarUltimoCommit(); // Elimina el último commit del proyecto
                    estiloCommit = "block"
                    ingresarAlProyecto(nombreProyecto); // Actualiza la lista de commits en pantalla
                });
                // Agrega el mensaje de confirmación y el botón de confirmación al contenedor de proyectos
                proyectoContainer.appendChild(confirmMessage);
                proyectoContainer.appendChild(btnConfirmar);
            });
            proyectoContainer.appendChild(btnEliminarUltimoCommit);
        }

        commitsProyecto.forEach(commit => {
            const commitItem = document.createElement('li');
            commitItem.textContent = `Pruebas: ${commit.cantPruebas},Pruebas Aprobadas: ${commit.cantPruebasAprob}, Líneas: ${commit.cantLineas}, Cobertura: ${commit.cobertura}%`;
            listaCommits.appendChild(commitItem);
        });
        proyectoContainer.appendChild(listaCommits)

        // Formulario para ingresar un nuevo commit
        const tituloCommit = document.createElement('h3');
        tituloCommit.textContent = "Añadir commit";
        const formCommit = document.createElement('form');
        const inputCantPruebas = document.createElement('input');
        inputCantPruebas.type = 'number';
        inputCantPruebas.placeholder = 'Cantidad de pruebas';
        const inputCantPruebasAprob = document.createElement('input');
        inputCantPruebasAprob.type = 'number';
        inputCantPruebasAprob.placeholder = 'Cantidad de pruebas Aprobadas';
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
            const cantPruebasAprob = parseInt(inputCantPruebasAprob.value);
            const cantLineas = parseInt(inputCantLineas.value);
            const cobertura = parseInt(inputCobertura.value);
            if (!isNaN(cantPruebas) && !isNaN(cantLineas) && !isNaN(cobertura) && cantPruebas >= 0 && cantLineas >= 0 && cobertura >= 0) {
                proyectoSeleccionado.aniadirCommitConPruebasAprob(cantPruebas, cantLineas, cobertura,cantPruebasAprob);
                estilo = "block";
                estiloCommit = "none";
                ingresarAlProyecto(nombreProyecto); // Actualiza la lista de commits en pantalla
            } else {
                // Muestra un mensaje de error si los campos no son números válidos
                const errorMensaje = document.createElement('div');
                errorMensaje.textContent = 'Por favor ingrese valores numéricos válidos.';
                proyectoContainer.appendChild(errorMensaje);
                estilo = "none";
                estiloCommit = "none";
                ingresarAlProyecto(nombreProyecto); // Actualiza la lista de commits en pantalla
            }
        });
        formCommit.appendChild(tituloCommit);
        formCommit.appendChild(inputCantPruebas);
        formCommit.appendChild(inputCantPruebasAprob)
        formCommit.appendChild(inputCantLineas);
        formCommit.appendChild(inputCobertura);
        formCommit.appendChild(btnConfirmCommit);
        proyectoContainer.appendChild(formCommit);
    }
}


function ingresarPuntajeProyecto(nombreProyecto) {
    proyectoContainer.innerHTML = ''; // Limpiar el contenedor de proyectos
    const proyectoSeleccionado = arrayProyectos.proyectosArray.find(proyecto => proyecto.getTitulo() === nombreProyecto);
    if (!proyectoSeleccionado) {
        const mensajeError = document.createElement('p');
        mensajeError.textContent = 'No se encontró el proyecto seleccionado.';
        proyectoContainer.appendChild(mensajeError);

        const btnVolver = document.createElement('button');
        btnVolver.textContent = 'Volver a la lista de proyectos';
        btnVolver.addEventListener('click', () => {
            actualizarProyectosEnPantalla(); // Vuelve a mostrar la lista de proyectos
        });
        proyectoContainer.appendChild(btnVolver);

        return; // Terminar la función aquí si no se encontró el proyecto
    }

    // Mostrar el título del proyecto
    const tituloProyecto = document.createElement('h2');
    tituloProyecto.textContent = `Proyecto: ${nombreProyecto}`;
    proyectoContainer.appendChild(tituloProyecto);
}





// Actualiza la lista de proyectos al cargar la página
actualizarProyectosEnPantalla();
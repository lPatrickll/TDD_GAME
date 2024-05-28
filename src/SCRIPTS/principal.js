import ArrayCommit from "../OBJETOS/commitsArray";
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
btnAddProyecto.addEventListener('click', mostrarFormularioProyecto);

function mostrarFormularioProyecto() {
    btnAddProyecto.style.display = 'none';
    proyectoForm.style.display = 'block';
}

// Evento al hacer clic en "Confirmar Proyecto"
btnConfirmProyecto.addEventListener('click', confirmarProyecto);

function confirmarProyecto() {
    const tituloProyecto = inputTitulo.value;
    if (tituloProyecto) {
        arrayProyectos.aniadirProyecto(tituloProyecto);
        inputTitulo.value = '';
        proyectoForm.style.display = 'none';
        actualizarListaProyectos();

        // Mostrar mensaje de éxito y botón "Aceptar"
        let successMessage = crearElemento("div", "Proyecto añadido con éxito");
        let acceptButton = crearElemento("button", "Aceptar");

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
}

function actualizarListaProyectos() {
    proyectoContainer.innerHTML = '';
    const proyectos = arrayProyectos.getProyectos();
    proyectos.forEach(proyecto => {
        const proyectoElement = crearElemento("div", proyecto);
        const btnIngresarProyecto = crearElemento("button", "Ver Commits");
        btnIngresarProyecto.addEventListener('click', () => {
            estilo = "none";
            estiloCommit = "none";
            ingresarAlProyecto(proyecto);
        });
        proyectoElement.appendChild(btnIngresarProyecto);

        const btnPuntajeProyecto = crearElemento("button", "Ver Puntaje del Proyecto");
        btnPuntajeProyecto.addEventListener('click', () => {
            estilo = "none";
            estiloCommit = "none";
            ingresarPuntajeProyecto(proyecto);
        });
        proyectoElement.appendChild(btnPuntajeProyecto);

        const btnBorrarProyecto = crearElemento("button", "Eliminar Proyecto");
        btnBorrarProyecto.addEventListener('click', () => {
            const confirmacion = window.confirm('¿Estás seguro de que deseas borrar este proyecto?');
            if (confirmacion) {
                arrayProyectos.borrarProyecto(proyecto);
                actualizarListaProyectos();
            }
        });
        proyectoElement.appendChild(btnBorrarProyecto);

        proyectoContainer.appendChild(proyectoElement);
    });
}

// Función para ingresar a un proyecto específico
function ingresarAlProyecto(nombreProyecto) {
    const proyectoSeleccionado = arrayProyectos.proyectosArray.find(proyecto => proyecto.getTitulo() === nombreProyecto);
    if (proyectoSeleccionado) {
        proyectoContainer.innerHTML = '';
        const tituloProyectoElement = crearElemento('h2', `Proyecto: ${nombreProyecto}`);
        proyectoContainer.appendChild(tituloProyectoElement);

        const btnVolver = crearElemento('button', 'Volver a la lista de proyectos');
        btnVolver.addEventListener('click', actualizarListaProyectos);
        proyectoContainer.appendChild(btnVolver);

        const ultimoCommitBorrado = crearElemento('div', 'Último commit borrado correctamente');
        const acceptCommitBorrado = crearElemento('button', 'Aceptar');

        ultimoCommitBorrado.style.display = estiloCommit;
        acceptCommitBorrado.addEventListener('click', () => {
            proyectoContainer.removeChild(ultimoCommitBorrado);
        });
        ultimoCommitBorrado.appendChild(acceptCommitBorrado);
        proyectoContainer.appendChild(ultimoCommitBorrado);

        const commitsProyecto = proyectoSeleccionado.mostrarCommitCompleto();
        const listaCommits = crearElemento('ul');

        if (commitsProyecto.length > 0) {
            const btnEliminarUltimoCommit = crearElemento('button', 'Eliminar Último Commit');
            btnEliminarUltimoCommit.addEventListener('click', () => {
                btnEliminarUltimoCommit.style.display = 'none';
                const confirmMessage = crearElemento('div', '¿Está seguro de que desea eliminar el último commit?');
                confirmMessage.style.color = 'red';
                const btnConfirmar = crearElemento('button', 'Confirmar');
                btnConfirmar.style.backgroundColor = 'red';
                btnConfirmar.addEventListener('click', () => {
                    estilo = 'none';
                    proyectoSeleccionado.eliminarUltimoCommit();
                    estiloCommit = "block";
                    ingresarAlProyecto(nombreProyecto);
                });
                proyectoContainer.appendChild(confirmMessage);
                proyectoContainer.appendChild(btnConfirmar);
            });
            proyectoContainer.appendChild(btnEliminarUltimoCommit);
        }

        commitsProyecto.forEach(commit => {
            const commitItem = crearElemento('li', `Pruebas: ${commit.cantPruebas}, Pruebas Aprobadas: ${commit.cantPruebasAprob}, Líneas: ${commit.cantLineas}, Cobertura: ${commit.cobertura}%`);
            const btnMostrarRecomendacion = crearElemento('button', 'Ver recomendación');
            let paragraph;
            btnMostrarRecomendacion.addEventListener('click', () => {
                if (!paragraph) {
                    paragraph = crearElemento('p', commit.recomendacion);
                    commitItem.appendChild(paragraph);
                    btnMostrarRecomendacion.textContent = 'Ocultar recomendación';
                } else {
                    commitItem.removeChild(paragraph);
                    paragraph = null;
                    btnMostrarRecomendacion.textContent = 'Ver recomendación';
                }
            });
            commitItem.appendChild(btnMostrarRecomendacion);
            listaCommits.appendChild(commitItem);
        });
        proyectoContainer.appendChild(listaCommits);

        const tituloCommit = crearElemento('h3', 'Añadir commit');
        const formCommit = crearElemento('form');
        const inputCantPruebas = crearElemento('input', '');
        inputCantPruebas.type = 'number';
        inputCantPruebas.placeholder = 'Cantidad de pruebas';
        const inputCantPruebasAprob = crearElemento('input', '');
        inputCantPruebasAprob.type = 'number';
        inputCantPruebasAprob.placeholder = 'Cantidad de pruebas aprobadas';
        const inputCantLineas = crearElemento('input', '');
        inputCantLineas.type = 'number';
        inputCantLineas.placeholder = 'Cantidad de líneas';
        const inputCobertura = crearElemento('input', '');
        inputCobertura.type = 'number';
        inputCobertura.placeholder = 'Porcentaje de cobertura';
        const btnConfirmarCommit = crearElemento('button', 'Agregar Commit');

        const successCommit = crearElemento('div', 'Commit añadido con éxito');
        const acceptCommit = crearElemento('button', 'Aceptar');
        successCommit.style.display = estilo;
        acceptCommit.addEventListener('click', () => {
            proyectoContainer.removeChild(successCommit);
        });
        successCommit.appendChild(acceptCommit);
        proyectoContainer.appendChild(successCommit);

        btnConfirmarCommit.addEventListener('click', () => {
            const cantPruebas = parseInt(inputCantPruebas.value);
            const cantPruebasAprob = parseInt(inputCantPruebasAprob.value);
            const cantLineas = parseInt(inputCantLineas.value);
            const cobertura = parseInt(inputCobertura.value);
            if (!isNaN(cantPruebas) && !isNaN(cantLineas) && cantPruebas >= 0 && cantLineas >= 0 && cantPruebasAprob <= cantPruebas) {
                proyectoSeleccionado.aniadirCommitFinal(cantPruebas, cantLineas, cobertura, cantPruebasAprob);
                estilo = "block";
                estiloCommit = "none";
                ingresarAlProyecto(nombreProyecto);
            } else {
                const errorMensaje = crearElemento('div', 'Por favor ingrese valores numéricos válidos.');
                proyectoContainer.appendChild(errorMensaje);
                estilo = "none";
                estiloCommit = "none";
                ingresarAlProyecto(nombreProyecto);
            }
        });
        formCommit.appendChild(tituloCommit);
        formCommit.appendChild(inputCantPruebas);
        formCommit.appendChild(inputCantPruebasAprob);
        formCommit.appendChild(inputCantLineas);
        formCommit.appendChild(inputCobertura);
        formCommit.appendChild(btnConfirmarCommit);
        proyectoContainer.appendChild(formCommit);
    }
}

function ingresarPuntajeProyecto(nombreProyecto) {
    proyectoContainer.innerHTML = '';
    const proyectoSeleccionado = arrayProyectos.proyectosArray.find(proyecto => proyecto.getTitulo() === nombreProyecto);
    if (!proyectoSeleccionado) {
        const mensajeError = crearElemento('p', 'No se encontró el proyecto seleccionado.');
        proyectoContainer.appendChild(mensajeError);

        const btnVolver = crearElemento('button', 'Volver a la lista de proyectos');
        btnVolver.addEventListener('click', actualizarListaProyectos);
        proyectoContainer.appendChild(btnVolver);

        return;
    }
    const tituloProyecto = crearElemento('h2', `Proyecto: ${nombreProyecto}`);
    proyectoContainer.appendChild(tituloProyecto);

    const btnVolver = crearElemento('button', 'Volver a la lista de proyectos');
    btnVolver.addEventListener('click', actualizarListaProyectos);
    proyectoContainer.appendChild(btnVolver);

    const puntajePruebas = proyectoSeleccionado.getPuntajePruebas();
    const tituloPuntajePruebas = crearElemento('p', `Puntaje de pruebas: ${puntajePruebas}%`);
    proyectoContainer.appendChild(tituloPuntajePruebas);

    const puntajeLineasCodigo = proyectoSeleccionado.getPuntajeLineasCodigo();
    const tituloPuntajeLineasCodigo = crearElemento('p', `Puntaje por líneas de código: ${puntajeLineasCodigo}%`);
    proyectoContainer.appendChild(tituloPuntajeLineasCodigo);

    const porcentajeCobertura = proyectoSeleccionado.getPorcentajeCobertura();
    const tituloPorcentajeCobertura = crearElemento('p', `Porcentaje de cobertura: ${porcentajeCobertura}%`);
    proyectoContainer.appendChild(tituloPorcentajeCobertura);
}

actualizarListaProyectos();

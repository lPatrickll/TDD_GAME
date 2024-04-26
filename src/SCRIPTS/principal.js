import ArrayProyectos from "../OBJETOS/proyectosArray"; // Asegúrate de que la ruta del archivo sea correcta

const arrayProyectos = new ArrayProyectos(); // Esto crea una instancia de ArrayCommits

const btnAddProyecto = document.getElementById('btnAniadirProyecto');
const proyectoForm = document.getElementById('proyectoForm');
const inputTitulo = document.getElementById('inputTitulo');
const btnConfirmProyecto = document.getElementById('btnConfirmProyecto');
const proyectoContainer = document.getElementById('proyectoContainer');
const mensajeError = document.getElementById('mensajeError');

btnAddProyecto.addEventListener('click', () => {
    btnAddProyecto.style.display = 'none'; // Ocultar el botón "Añadir Commit"
    proyectoForm.style.display = 'block';
});

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
        // Restaurar la visibilidad del botón "Añadir Commit"
        btnAddProyecto.style.display = 'block';
        // Ocultar y restablecer el mensaje de error
        mensajeError.textContent = '';
        mensajeError.style.display = 'none';
    } else {
        mensajeError.textContent = 'Por favor ingrese un título para el proyecto.';
        mensajeError.style.display = 'block';
    }
});

function actualizarProyectosEnPantalla() {
    proyectoContainer.innerHTML = '';
    const proyectos = arrayProyectos.getProyectos();
    proyectos.forEach(proyecto => {
        const proyectoElement = document.createElement('div');
        proyectoElement.textContent = proyecto; // No es necesario llamar a commit.getTitulo() aquí
        proyectoContainer.appendChild(proyectoElement);
    });
}

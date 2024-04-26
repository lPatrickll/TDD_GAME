import ArrayCommits from "../OBJETOS/commitsArray"; // Asegúrate de que la ruta del archivo sea correcta

const arrayCommits = new ArrayCommits(); // Esto crea una instancia de ArrayCommits

const btnAddCommit = document.getElementById('btnAniadirCommit');
const commitForm = document.getElementById('commitForm');
const inputTitulo = document.getElementById('inputTitulo');
const btnConfirmCommit = document.getElementById('btnConfirmCommit');
const commitContainer = document.getElementById('commitContainer');
const mensajeError = document.getElementById('mensajeError');

btnAddCommit.addEventListener('click', () => {
    btnAddCommit.style.display = 'none'; // Ocultar el botón "Añadir Commit"
    commitForm.style.display = 'block';
});

btnConfirmCommit.addEventListener('click', () => {
    const tituloCommit = inputTitulo.value;
    if (tituloCommit) {
        arrayCommits.aniadirCommit(tituloCommit);
        inputTitulo.value = '';
        commitForm.style.display = 'none';
        actualizarCommitsEnPantalla();
        // Mostrar mensaje de éxito y botón "Aceptar"
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Commit añadido con éxito';
        const acceptButton = document.createElement('button');
        acceptButton.textContent = 'Aceptar';
        acceptButton.addEventListener('click', () => {
            commitContainer.removeChild(successMessage);
        });
        successMessage.appendChild(acceptButton);
        commitContainer.appendChild(successMessage);
        // Restaurar la visibilidad del botón "Añadir Commit"
        btnAddCommit.style.display = 'block';
        // Ocultar y restablecer el mensaje de error
        mensajeError.textContent = '';
        mensajeError.style.display = 'none';
    } else {
        mensajeError.textContent = 'Por favor ingrese un título para el commit.';
        mensajeError.style.display = 'block';
    }
});

function actualizarCommitsEnPantalla() {
    commitContainer.innerHTML = '';
    const commits = arrayCommits.getCommits();
    commits.forEach(commit => {
        const commitElement = document.createElement('div');
        commitElement.textContent = commit; // No es necesario llamar a commit.getTitulo() aquí
        commitContainer.appendChild(commitElement);
    });
}

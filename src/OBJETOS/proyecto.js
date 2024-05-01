import ArrayCommit from "./commitsArray";
import Puntaje from "./puntaje";

class Proyecto {
    constructor(titulo) {
        this.titulo = titulo;
        this.arrayCommit = new ArrayCommit();
        this.puntaje = new Puntaje(); 
    }

    getTitulo() {
        return this.titulo;
    }

    aniadirCommit(cantPruebas, cantLineas, cobertura) {
        this.arrayCommit.aniadirCommit(cantPruebas, cantLineas, cobertura);
    }

    aniadirCommitConPruebasAprob(cantPruebas, cantLineas, cobertura,cantPruebasAprob) {
        this.arrayCommit.aniadirCommitConCantPruebAprob(cantPruebas, cantLineas, cobertura,cantPruebasAprob);
    }

    mostrarCommits() {
        return this.arrayCommit.mostrarCommit();
    }

    mostrarCommitsConPruebasAprob() {
        return this.arrayCommit.mostrarCommitConPruebasAprob();
    }

    eliminarUltimoCommit() {
        this.arrayCommit.eliminarUltimoCommit();
    }

    getPuntajePruebas() {
        let puntajePorcentaje = this.calcularPorcentajePruebas(); // Llamar a calcularDiferenciaPruebas() con this
        this.puntaje.setPuntajePruebas(puntajePorcentaje); // Establecer el puntaje de pruebas con la diferencia calculada
        return this.puntaje.getPuntajePruebas();
    }

    getPuntajeLineasPruebas() {
        return this.puntaje.getPuntajeLineasPruebas();
    }


    calcularPorcentajePruebas() {
        let totalPruebas = 0;
        let totalPruebasAprobadas = 0;
        let porcentaje=0;
        // Recorremos cada commit en el array de commits
        if (this.arrayCommit.getCommits().length > 0)
        {
            for (let commit of this.arrayCommit.getCommits()) {
                totalPruebas += commit.getCantPruebas();
                totalPruebasAprobadas += commit.getCantPruebasAprob();
            }
            // Calculamos la diferencia
            porcentaje = (totalPruebasAprobadas/totalPruebas)*100;
        }
        console.log("-------------------------------------------------------------------",porcentaje);
        return porcentaje;
    }
}

export default Proyecto;

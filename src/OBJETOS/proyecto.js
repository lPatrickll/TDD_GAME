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

    getPuntajeLineasCodigo() {
        let puntajeLineasCodigo = this.calcularPuntajeLineasCodigo(); // Calcular el puntaje por líneas de código
        this.puntaje.setPuntajeLineasCodigo(puntajeLineasCodigo); // Establecer el puntaje por líneas de código
        return this.puntaje.getPuntajeLineasCodigo(); // Obtener y devolver el puntaje por líneas de código
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

    calcularPuntajeLineasCodigo() {
        const commits = this.arrayCommit.getCommits();
        let contadorDisminucion = 0;
        let contadorIncremento = 0;
        let lineasAnteriores = 0;

        for (let i = 0; i < commits.length; i++) {
            const commit = commits[i];
            const lineasActuales = commit.getCantLineas();

            if (i > 0 && lineasActuales < lineasAnteriores) {
                contadorDisminucion++;
                if (contadorDisminucion > 2) {
                    contadorIncremento -= 20; // Reducir el puntaje en un 20%
                }
            } else {
                contadorDisminucion = 0;
            }

            lineasAnteriores = lineasActuales;
        }

        const puntajeLineasCodigo = 100 + contadorIncremento; // Inicialmente, el puntaje es 100%
        this.puntaje.setPuntajeLineasCodigo(puntajeLineasCodigo);
        return puntajeLineasCodigo;
    }
}

export default Proyecto;

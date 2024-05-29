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

    aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad) {
        this.arrayCommit.aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad);
    }

    aniadirCommitFinal(cantPruebas, cantLineas, cobertura, cantPruebasAprob, complejidad) {
        this.arrayCommit.aniadirCommitFinal(cantPruebas, cantPruebasAprob, cantLineas, cobertura, complejidad);
    }

    mostrarCommits() {
        return this.arrayCommit.mostrarCommit();
    }

    mostrarCommitCompleto() {
        return this.arrayCommit.mostrarCommitCompleto();
    }

    eliminarUltimoCommit() {
        this.arrayCommit.eliminarUltimoCommit();
    }

    getPuntajePruebas() {
        let puntajePorcentaje = this.calcularPorcentajePruebas();
        this.puntaje.setPuntajePruebas(puntajePorcentaje);
        return this.puntaje.getPuntajePruebas();
    }

    getPuntajeLineasCodigo() {
        let puntajeLineasCodigo = this.calcularPuntajeLineasCodigo();
        this.puntaje.setPuntajeLineasCodigo(puntajeLineasCodigo);
        return this.puntaje.getPuntajeLineasCodigo();
    }

    getPorcentajeCobertura() {
        let porcentajeCobertura = this.calcularPorcentajeCobertura();
        this.puntaje.setPorcentajeCobertura(porcentajeCobertura);
        return this.puntaje.getPuntajeCobertura();
    }

    calcularPorcentajePruebas() {
        let totalPruebas = 0;
        let totalPruebasAprobadas = 0;
        let porcentaje = 0;

        if (this.arrayCommit.getCommits().length > 0) {
            for (let commit of this.arrayCommit.getCommits()) {
                totalPruebas += commit.getCantPruebas();
                totalPruebasAprobadas += commit.getCantPruebasAprob();
            }
            porcentaje = (totalPruebasAprobadas / totalPruebas) * 100;
        }
       return porcentaje;
    }

    calcularPuntajeLineasCodigo() {
        const commits = this.arrayCommit.getCommits();
        let puntaje = 100;
        let lineasAnteriores = 0;
        let contadorDisminucion = 0;

        for (let i = 0; i < commits.length; i++) {
            const commit = commits[i];
            const lineasActuales = commit.getCantLineas();

            if (lineasActuales < lineasAnteriores) {
                contadorDisminucion++;
            } else {
                contadorDisminucion = 0;
            }

            if (lineasActuales - lineasAnteriores > 30 && i != 0) {
                puntaje -= 20;
            } else {
                if (lineasActuales > lineasAnteriores && i != 0) {
                    puntaje += 5;
                }
            }

            if (contadorDisminucion >= 3) {
                puntaje -= 20;
                contadorDisminucion = 0;
            }

            lineasAnteriores = lineasActuales;
        }
        puntaje = Math.max(Math.min(puntaje, 100), 0);
        return puntaje;
    }

    calcularPorcentajeCobertura() {
        let totalPorcentajes = 0;
        let porcentaje = 0;
        let cantPorcentajes = 0;

        if (this.arrayCommit.getCommits().length > 0) {
            for (let commit of this.arrayCommit.getCommits()) {
                totalPorcentajes += commit.getCobertura();
                cantPorcentajes++;
            }
            porcentaje = (totalPorcentajes / cantPorcentajes);
        }
        return porcentaje;
    }

    calcularPuntuacionGeneral() {
        const puntajePruebas = this.getPuntajePruebas();
        const puntajeLineasCodigo = this.getPuntajeLineasCodigo();
        const puntajeCobertura = this.getPorcentajeCobertura();

        // Aquí puedes ajustar cómo se combinan estas puntuaciones para obtener una puntuación general
        return (puntajePruebas + puntajeLineasCodigo + puntajeCobertura) / 3;
    }
}
export default Proyecto;

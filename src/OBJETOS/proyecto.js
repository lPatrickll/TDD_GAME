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

    aniadirCommitFinal(cantPruebas, cantLineas, cobertura,cantPruebasAprob) {
        this.arrayCommit.aniadirCommitFinal(cantPruebas,cantPruebasAprob,cantLineas,cobertura);
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
        let puntajePorcentaje = this.calcularPorcentajePruebas(); // Llamar a calcularDiferenciaPruebas() con this
        this.puntaje.setPuntajePruebas(puntajePorcentaje); // Establecer el puntaje de pruebas con la diferencia calculada
        return this.puntaje.getPuntajePruebas();
    }

    getPuntajeLineasCodigo() {
        let puntajeLineasCodigo = this.calcularPuntajeLineasCodigo(); // Calcular el puntaje por líneas de código
        this.puntaje.setPuntajeLineasCodigo(puntajeLineasCodigo); // Establecer el puntaje por líneas de código
        return this.puntaje.getPuntajeLineasCodigo(); // Obtener y devolver el puntaje por líneas de código
    }
    getPorcentajeCobertura()
    {
        let porcentajeCobertura = this.calcularPorcentajeCobertura();
        this.puntaje.setPorcentajeCobertura(porcentajeCobertura);
        return this.puntaje.getPuntajeCobertura();
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
        let puntaje = 100; // Iniciamos el puntaje en 100
        let lineasAnteriores = 0;
        let contadorDisminucion = 0;
    
        for (let i = 0; i < commits.length; i++) {
            const commit = commits[i];
            const lineasActuales = commit.getCantLineas();
    
            // Si las líneas actuales son menores que las líneas anteriores, incrementamos el contador de disminución
            if (lineasActuales < lineasAnteriores) {
                contadorDisminucion++;
            } else {
                contadorDisminucion = 0;
            }
    
            if (lineasActuales - lineasAnteriores > 30 && i != 0) {
                puntaje -= 20;
            } else{
                // Si las líneas actuales son mayores que las líneas anteriores, incrementamos el puntaje en 5
                if (lineasActuales > lineasAnteriores &&  i != 0) {
                    puntaje += 5;
                }
            }
    
            // Si hay una disminución en las líneas de código durante tres commits seguidos, reducimos el puntaje en 30
            if (contadorDisminucion >= 3) {
                puntaje -= 20;
                contadorDisminucion = 0; // Reiniciamos el contador de disminución
            }
    
            lineasAnteriores = lineasActuales; // Actualizamos las líneas anteriores para la próxima iteración
        }
        puntaje = Math.max(Math.min(puntaje, 100), 0);
        return puntaje; // Devolvemos el puntaje
    }
    calcularPorcentajeCobertura()
    {
        let totalPorcentajes = 0;
        let porcentaje=0;
        let cantPorcentajes=0;
        // Recorremos cada commit en el array de commits
        if (this.arrayCommit.getCommits().length > 0)
        {
            for (let commit of this.arrayCommit.getCommits()) {
                totalPorcentajes += commit.getCobertura();
                cantPorcentajes =cantPorcentajes+1;
            }
            // Calculamos la diferencia
            porcentaje = (totalPorcentajes/cantPorcentajes);
        }
        return porcentaje;
    }
    
}

export default Proyecto;
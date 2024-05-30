import Commit from "./commit";

class ArrayCommit {
    constructor() {
        this.arrayCommit = [];
    }

    aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad, fecha, id) {
        const nuevoCommit = new Commit(cantPruebas, cantLineas, cobertura, complejidad,fecha, id);
        this.arrayCommit.push(nuevoCommit);
    }

    aniadirCommitObj(Commit) {
        this.arrayCommit.push(Commit);
    }


    mostrarCommitCompleto() {
        return this.arrayCommit.map(commit => ({
            idCommit: commit.getId(),
            fechaHora: commit.getFechaHora(),
            cantPruebas: commit.getCantPruebas(),
            cantLineas: commit.getCantLineas(),
            cobertura: commit.getCobertura(),
            complejidad: commit.getComplejidad(),
            recomendacion: commit.getRecomendacion(),
            frecuencia:commit.getFrecuencia(),
        }));
    }

    eliminarUltimoCommit() {
        if (this.arrayCommit.length > 0) {
            this.arrayCommit.pop();
        }
        return this.arrayCommit;
    }

    getCommits() {
        return this.arrayCommit;
    }


    calcularFrecuenciaCommits() {
        if (this.arrayCommit.length < 2) {
            if (this.arrayCommit.length === 1) {
                this.arrayCommit[0].setFrecuencia("Regular");
                return this.arrayCommit[0].getFrecuencia();
            }
            return "No hay commits suficientes para calcular la frecuencia";
        }

        for (let i = 1; i < this.arrayCommit.length; i++) {
            try {
                let fechaActual = this.parseFecha(this.arrayCommit[i].getFechaHora());
                let fechaAnterior = this.parseFecha(this.arrayCommit[i - 1].getFechaHora());
                let diferenciaDias = (fechaActual - fechaAnterior) / (1000 * 60 * 60 * 24);

                console.log("diferencia: ", diferenciaDias);

                let frecuencia = "Regular";
                if (diferenciaDias < 2) {
                    frecuencia = "Excelente";
                } else if (diferenciaDias < 3) {
                    frecuencia = "Bueno";
                } else if (diferenciaDias < 7) {
                    frecuencia = "Regular";
                } else {
                    frecuencia = "Deficiente";
                }

                this.arrayCommit[i].setFrecuencia(frecuencia);
            } catch (error) {
                console.error(`Error al calcular la frecuencia para el commit en la posición ${i}: ${error.message}`);
                this.arrayCommit[i].setFrecuencia("Error en el formato de fecha");
            }
        }

        return this.arrayCommit[this.arrayCommit.length - 1].getFrecuencia();
    }

    parseFecha(fechaHoraStr) {
        if (!fechaHoraStr) {
            throw new Error("Fecha y hora no definida");
        }

        const partesFechaHora = fechaHoraStr.split('-');
        if (partesFechaHora.length !== 2) {
            throw new Error(`Formato de fecha y hora incorrecto: ${fechaHoraStr}`);
        }

        const [fecha, hora] = partesFechaHora;
        const partesFecha = fecha.split('/');
        const partesHora = hora.split(':');

        if (partesFecha.length !== 3 || partesHora.length !== 2) {
            throw new Error(`Formato de fecha y hora incorrecto: ${fechaHoraStr}`);
        }

        const [dia, mes, anio] = partesFecha.map(num => parseInt(num, 10));
        const [horas, minutos] = partesHora.map(num => parseInt(num, 10));

        return new Date(anio, mes - 1, dia, horas, minutos);
    }

    
}
export default ArrayCommit;

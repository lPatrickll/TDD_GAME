import Commit from "../OBJETOS/commit";

describe("Commits", () => {
    let commit;

    it("Despues de ingresar un commit editar la cantidad de pruebas", () => {
        commit = new Commit(2, 10, 100);
        commit.editarCantPruebas(1);
        expect(commit.getCantPruebas()).toEqual(1);
    });

    it("Despues de ingresar un commit editar la cantidad de pruebas", () => {
        commit = new Commit(2, 10, 100);
        commit.editarCantLineas(15);
        expect(commit.getCantLineas()).toEqual(15);
    });

// Tercera Historia de Usuario -> Patrick *********************************
    it("Se debe añadir un la cantidad de prueba para un commit", () => {
        let cantPruebas = 1;

        let commit2 = new Commit(cantPruebas);
        expect(commit2.getCantPruebas()).toEqual(1);
    });

    it("Se debe añadir un la cantidad de lineas para un commit", () => {
        let cantPruebas = 1;
        let cantLineas = 10;
    
        let commit2 = new Commit(cantPruebas, cantLineas);
        expect(commit2.getCantLineas()).toEqual(10);
    });
    
    it("Se debe añadir un la cobertura para un commit", () => {
        let cantPruebas = 1;
        let cantLineas = 10;
        let cobertura = 15;
    
        let commit2 = new Commit(cantPruebas, cantLineas, cobertura);
        expect(commit2.getCobertura()).toEqual(15);
    });


    
});
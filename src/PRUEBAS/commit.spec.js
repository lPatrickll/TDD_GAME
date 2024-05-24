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
});
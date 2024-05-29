
import Proyecto from "../OBJETOS/proyecto";


describe("Proyecto", () => {

    let proyecto;
  beforeEach(() => {
    proyecto = new Proyecto("Proyecto 1");
  });

    // Tercera Historia de Usuario -> Patrick *********************************


    it("debería añadir un commit correctamente", () => {
        proyecto.aniadirCommit(3, 100, 80);
        expect(proyecto.mostrarCommits()).toEqual([
          { cantPruebas: 3, cantLineas: 100, cobertura: 80 }
        ]);
      });
});

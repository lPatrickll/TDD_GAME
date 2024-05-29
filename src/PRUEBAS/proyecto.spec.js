
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



        // 4ta HU -> Fabio ****************************************************


  it("Deberia eliminar un commit desde un objeto proyecto", () => {
    const proyecto = new Proyecto("Elim");
    proyecto.aniadirCommit(4, 4, 4);
    proyecto.eliminarUltimoCommit();
    let expectedArray = [
      { cantPruebas: 4, cantLineas: 4, cobertura: 4 }, { cantPruebas: 10, cantLineas: 9, cobertura: 10}];
    expect(proyecto.mostrarCommits()).toEqual([]);
  });
 
});

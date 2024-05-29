
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



  // ********************************************************************
  // 5ta HU Arturo

    it("El proyecto deberia de devolver el puntaje de 0", () => {

        const proyecto = new Proyecto("Proyecto1");
        expect(proyecto.getPuntajePruebas()).toEqual(0);
    });

    it("El proyecto deberia de devolver el puntaje de 50% para la mitad de pruebas aprobadas", () => {

        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommitFinal(2, 4, 4,1);

        expect(proyecto.getPuntajePruebas()).toEqual(50);
    });



    it("El proyecto deberia de mostrar commits con pruebas aprobadas", () => {
        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommitFinal(2, 2, 30,2);
        let expectedArray = [{
        cantPruebas: 2,
        cantPruebasAprob:2,
        cantLineas: 2,
        cobertura: 30,
        recomendacion: "Buen trabajo en las pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."
        }];
        expect(proyecto.mostrarCommitCompleto()).toEqual(expectedArray);
    });

    it("El proyecto deberia de devolver el puntaje de 100% todas las pruebas aprobadas", () => {

        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommitFinal(2, 4, 4,2);
        proyecto.aniadirCommitFinal(2, 4, 4,2);
        proyecto.aniadirCommitFinal(2, 4, 4,2);
        proyecto.aniadirCommitFinal(2, 4, 4,2);

        expect(proyecto.getPuntajePruebas()).toEqual(100);
    });
 
});

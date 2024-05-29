
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
        proyecto.aniadirCommitFinal(2, 4, 4,"regular");

        expect(proyecto.getPuntajePruebas()).toEqual(0);
    });



    it("El proyecto deberia de mostrar commits con pruebas aprobadas", () => {
        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommit(2, 2, 30,"regular");
        let expectedArray = [{
        cantPruebas: 2,
        cantLineas: 2,
        cobertura: 30,
        complejidad:"regular",
        recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."
        }];
        expect(proyecto.mostrarCommitCompleto()).toEqual(expectedArray);
    });

    it("El proyecto deberia de devolver el puntaje de 100% todas las pruebas aprobadas", () => {

        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommitFinal(2, 4, 4,"regular");
        proyecto.aniadirCommitFinal(2, 4, 4,"regular");
        proyecto.aniadirCommitFinal(2, 4, 4,"regular");
        proyecto.aniadirCommitFinal(2, 4, 4,"regular");

        expect(proyecto.getPuntajePruebas()).toEqual(0);
    });


// ********************************************************************
  // 6ta HU Salvador
    it("El proyecto deberia de devolver el puntaje de 100 en base a la cantidad de lineas", () => {
        const proyecto = new Proyecto("Proyecto1");
        expect(proyecto.getPuntajeLineasCodigo()).toEqual(100);
    });

    it("El proyecto deberia de devolver el puntaje de 80 para 3 commits reducidos", () => {
        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommit(5, 10, 1);
        proyecto.aniadirCommit(5, 7, 1);
        proyecto.aniadirCommit(5, 6, 1);
        proyecto.aniadirCommit(5, 2, 1);
        expect(proyecto.getPuntajeLineasCodigo()).toEqual(80);
    });

    it("El proyecto deberia de devolver el puntaje de 80 para 3 commits reducidos consecutivamente", () => {
        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommit(5, 10, 1);
        proyecto.aniadirCommit(5, 7, 1);
        proyecto.aniadirCommit(5, 6, 1);
        proyecto.aniadirCommit(5, 2, 1);
        proyecto.aniadirCommit(5, 4, 1);
        proyecto.aniadirCommit(5, 3, 1);
        expect(proyecto.getPuntajeLineasCodigo()).toEqual(85);
    });

    it("El proyecto deberia devolver 95 debido al incremento de las lineas de codigo", () => {
        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommit(5, 10, 1);
        proyecto.aniadirCommit(5, 7, 1);
        proyecto.aniadirCommit(5, 6, 1);
        proyecto.aniadirCommit(5, 2, 1);
        proyecto.aniadirCommit(5, 3, 1);
        proyecto.aniadirCommit(5, 4, 1);
        proyecto.aniadirCommit(5, 5, 1);
        expect(proyecto.getPuntajeLineasCodigo()).toEqual(95);
    });

    it("El proyecto deberia de devolver el puntaje de 80 si aumenta de golpe la cantidad de lineas de codigo", () => {
        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommit(5, 10, 1);
        proyecto.aniadirCommit(5, 100, 1);
        expect(proyecto.getPuntajeLineasCodigo()).toEqual(80);
    });
    

    

    it("el proyecto deberia de mostrar el commit añadido, incluyendo el porcentaje de cobertura calculado", () => {
        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommit(10,10,10,"regular");
        let expectedArray = [{
        cantPruebas: 10,
        cantLineas: 10,
        cobertura: 10,
        complejidad:"regular",
        recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."
        }];
        expect(proyecto.mostrarCommitCompleto()).toEqual(expectedArray);
    });



    it("El proyecto deberia de devolver 0 de porcentaje de cobertura", () => {

        const proyecto = new Proyecto("Proyecto1");
        expect(proyecto.getPorcentajeCobertura()).toEqual(0);
    });

    it("El proyecto deberia de devolver 50 de porcentaje de cobertura para dos commits con 50% de cobertura", () => {
        const proyecto = new Proyecto("Proyecto2");
        proyecto.aniadirCommitFinal(10,10,50,50);
        proyecto.aniadirCommitFinal(10,10,50,50);
        expect(proyecto.getPorcentajeCobertura()).toEqual(50);
    });
    
    


    it("El proyecto debería mostrar los commits con la complejidad incluida", () => {
        const proyecto = new Proyecto("Proyecto Complejidad");
        proyecto.aniadirCommit(4, 100, 100, "Excelente");
        let expectedArray = [{
        cantPruebas: 4,
        cantLineas: 100,
        cobertura: 100,
        complejidad: "Excelente"
        }];
        expect(proyecto.mostrarCommits()).toEqual(expectedArray);
    });
 
});

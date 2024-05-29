import ArrayCommit from "../OBJETOS/commitsArray";

describe("Prueba Lista de commits", () => {
    let arrayCommit = new ArrayCommit();


    // Tercera Historia de Usuario -> Patrick *********************************
  
    beforeEach(() => {
        arrayCommit = new ArrayCommit();

      });
    it("Se debe mostra un commit", () => {
      let cantPruebas = 1;
      let cantLineas = 10;
      let cobertura = 15;
  
      arrayCommit.aniadirCommit(cantPruebas, cantLineas, cobertura);
      let expectedArray = [{
        cantPruebas: 1,
        cantLineas: 10,
        cobertura: 15
      }];
  
      expect(arrayCommit.mostrarCommit()).toEqual(expectedArray);
    });

    it("Se debe mostra varios commits", () => {
        arrayCommit.aniadirCommit(2, 20, 30);
        arrayCommit.aniadirCommit(1, 15, 25);
        arrayCommit.aniadirCommit(3, 30, 35);
        let expectedArray = [{
          cantPruebas: 2,
          cantLineas: 20,
          cobertura: 30
        },
        {
          cantPruebas: 1,
          cantLineas: 15,
          cobertura: 25
        },
        {
          cantPruebas: 3,
          cantLineas: 30,
          cobertura: 35
        }];
    
        expect(arrayCommit.mostrarCommit()).toEqual(expectedArray);
      });

      // ********************************************************************
  // 4ta HU -> Fabio ****************************************************
    it("no debería hacer nada si no hay commits en el array", () => {
        const arrayCommit = new ArrayCommit();
        arrayCommit.eliminarUltimoCommit();
        expect(arrayCommit.mostrarCommit()).toEqual([]);
    });

    it("debería eliminar el último commit si hay commits en el array", () => {
        const arrayCommit = new ArrayCommit();
        arrayCommit.aniadirCommit(4, 4, 4);
        arrayCommit.eliminarUltimoCommit();
        expect(arrayCommit.mostrarCommit()).toEqual([]);
    });

    it("Si añadi dos commits debería eliminar el último commit", () => {
        const arrayCommit = new ArrayCommit();
        arrayCommit.aniadirCommit(4, 4, 4);
        arrayCommit.aniadirCommit(5, 5, 5);
        arrayCommit.eliminarUltimoCommit();
        let expectedArray = [{
        cantPruebas: 4,
        cantLineas: 4,
        cobertura: 4 
        }];
        expect(arrayCommit.mostrarCommit()).toEqual(expectedArray);
    });

    it("Si añadi Tres commits debería eliminar el último commit", () => {
        const arrayCommit = new ArrayCommit();
        arrayCommit.aniadirCommit(4, 4, 4);
        arrayCommit.aniadirCommit(10, 9, 10);
        arrayCommit.aniadirCommit(5, 5, 5);
        arrayCommit.eliminarUltimoCommit();
        let expectedArray = [
        { cantPruebas: 4, cantLineas: 4, cobertura: 4 }, { cantPruebas: 10, cantLineas: 9, cobertura: 10}];
        expect(arrayCommit.mostrarCommit()).toEqual(expectedArray);
    });

      // ********************************************************************
  // 5ta HU Arturo

    it("Se debe mostrar un commit con pruebas aprobadas", () => {
        arrayCommit.aniadirCommitFinal(2, 2, 2,30);
        let expectedArray = [{
        cantPruebas: 2,
        cantPruebasAprob:2,
        cantLineas: 2,
        cobertura: 30,
        recomendacion: "Buen trabajo en las pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."
        }];
        expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
    });





    
});
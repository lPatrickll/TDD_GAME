import Commit from "../OBJETOS/commit";
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


      // ********************************************************************
  // 6ta HU Salvador

    it("El Array de commits deberia de devolver todos sus datos del commit con porcentajeCober CALCULADO", () => {
        let commit2=new Commit(4,100,87);
        commit2.setPruebasAprob(2);
        arrayCommit.aniadirCommitObj(commit2);
        let expectedArray = [{
        cantPruebas: 4,
        cantPruebasAprob:2,
        cantLineas: 100,
        cobertura: 87,
        recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. "
        }];
        expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
    });

    it("Añadir Commit a array de commit aniadiendo lineas de cobertura", () => {
        arrayCommit.aniadirCommitFinal(10,10,10,100);
        let expectedArray = [{
          cantPruebas: 10,
          cantPruebasAprob:10,
          cantLineas: 10,
          cobertura: 100,
          recomendacion: "Buen trabajo en las pruebas aprobadas. "
        }];
        expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
    });

    it("El array de commits debería mostrar la complejidad correctamente", () => {
        arrayCommit.aniadirCommit(4, 100, 100, "Excelente");
        let expectedArray = [{
          cantPruebas: 4,
          cantLineas: 100,
          cobertura: 100,
          complejidad: "Excelente"
        }];
        expect(arrayCommit.mostrarCommit()).toEqual(expectedArray);
    });





    
});
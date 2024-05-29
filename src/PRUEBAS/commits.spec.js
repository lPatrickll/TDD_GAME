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
  
      arrayCommit.aniadirCommit(cantPruebas, cantLineas, cobertura,"regular");
      let expectedArray = [{
        cantPruebas: 1,
        cantLineas: 10,
        cobertura: 15,
        complejidad:"regular",
        recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."
      }];
  
      expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
    });

    it("Se debe mostra varios commits", () => {
        arrayCommit.aniadirCommit(2, 20, 30,"regular");
        arrayCommit.aniadirCommit(1, 15, 25,"regular");
        arrayCommit.aniadirCommit(3, 30, 35,"regular");
        let expectedArray = [{
          cantPruebas: 2,
          cantLineas: 20,
          cobertura: 30,
          complejidad:"regular",
          recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."
        },
        {
          cantPruebas: 1,
          cantLineas: 15,
          cobertura: 25,
          complejidad:"regular",
          recomendacion:"Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."
        },
        {
          cantPruebas: 3,
          cantLineas: 30,
          cobertura: 35,
          complejidad:"regular",
          recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."
        }];
    
        expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
      });

      // ********************************************************************
  // 4ta HU -> Fabio ****************************************************
    it("no debería hacer nada si no hay commits en el array", () => {
        const arrayCommit = new ArrayCommit();
        arrayCommit.eliminarUltimoCommit();
        expect(arrayCommit.mostrarCommitCompleto()).toEqual([]);
    });

    it("debería eliminar el último commit si hay commits en el array", () => {
        const arrayCommit = new ArrayCommit();
        arrayCommit.aniadirCommit(4, 4, 4,"regular");
        arrayCommit.eliminarUltimoCommit();
        expect(arrayCommit.mostrarCommitCompleto()).toEqual([]);
    });

    it("Si añadi dos commits debería eliminar el último commit", () => {
        const arrayCommit = new ArrayCommit();
        arrayCommit.aniadirCommit(4, 4, 4,"regular");
        arrayCommit.aniadirCommit(5, 5, 5);
        arrayCommit.eliminarUltimoCommit();
        let expectedArray = [{
        cantPruebas: 4,
        cantLineas: 4,
        cobertura: 4 ,
        complejidad:"regular",
        recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas.",
        }];
        expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
    });

    it("Si añadi Tres commits debería eliminar el último commit", () => {
        const arrayCommit = new ArrayCommit();
        arrayCommit.aniadirCommit(4, 4, 4,"regular");
        arrayCommit.aniadirCommit(10, 9, 10,"regular");
        arrayCommit.aniadirCommit(5, 5, 5,"regular");
        arrayCommit.eliminarUltimoCommit();
        let expectedArray = [
        { cantPruebas: 4, cantLineas: 4, cobertura: 4,complejidad:"regular",recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas.", }, { cantPruebas: 10, cantLineas: 9, cobertura: 10,complejidad:"regular",recomendacion:"Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."}];
        expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
    });

      // ********************************************************************
  // 5ta HU Arturo

    it("Se debe mostrar un commit con pruebas aprobadas", () => {
        arrayCommit.aniadirCommit(2, 2,30,"excelente");
        let expectedArray = [{
        cantPruebas: 2,
        cantLineas: 2,
        cobertura: 30,
        complejidad:"excelente",
        recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."
        }];
        expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
    });


      // ********************************************************************
  // 6ta HU Salvador

    it("El Array de commits deberia de devolver todos sus datos del commit con porcentajeCober CALCULADO", () => {
        let commit2=new Commit(4,100,87);
        arrayCommit.aniadirCommitObj(commit2);
        let expectedArray = [{
        cantPruebas: 4,
        cantLineas: 100,
        cobertura: 87,
        recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. "
        }];
        expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
    });

    it("Añadir Commit a array de commit aniadiendo lineas de cobertura", () => {
        arrayCommit.aniadirCommit(10,10,100,"bueno");
        let expectedArray = [{
          cantPruebas: 10,
          cantLineas: 10,
          cobertura: 100,
          complejidad:"bueno",
          recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. "
        }];
        expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
    });

    it("El array de commits debería mostrar la complejidad correctamente", () => {
        arrayCommit.aniadirCommit(4, 100, 100, "Excelente");
        let expectedArray = [{
          cantPruebas: 4,
          cantLineas: 100,
          cobertura: 100,
          complejidad: "Excelente",
          "recomendacion": "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
        }];
        expect(arrayCommit.mostrarCommitCompleto()).toEqual(expectedArray);
    });

// 4ta HU 2do SPRINT
it("El array de commits deberia de mostrar el ultimo commit como frecuencia excelente", () => {
  const arrayCommit = new ArrayCommit();
  arrayCommit.aniadirCommit(4, 100, 100, "Excelente", "2024-04-10");
  arrayCommit.aniadirCommit(4, 100, 100, "Excelente", "2024-04-11");
  expect(arrayCommit.calcularFrecuenciaCommits()).toEqual("Excelente");
});

it("El array de commits debería mostrar el ultimo commit como frecuencia Regular al ser el unico commit", () => {
  const arrayCommit = new ArrayCommit();
  arrayCommit.aniadirCommit(4, 100, 100, "Excelente", "2024-04-10");
  expect(arrayCommit.calcularFrecuenciaCommits()).toEqual("Regular");
});

it("El array de commits deberia de mostrar el ultimo commit como frecuencia Bueno con diferencia < 3 dias", () => {
  const arrayCommit = new ArrayCommit();
  arrayCommit.aniadirCommit(4, 100, 100, "Excelente", "2024-04-10");
  arrayCommit.aniadirCommit(4, 100, 100, "Excelente", "2024-04-12");
  expect(arrayCommit.calcularFrecuenciaCommits()).toEqual("Bueno");
});

it("El array de commits deberia de mostrar el ultimo commit como frecuencia Regular con diferencia < 7 dias", () => {
  const arrayCommit = new ArrayCommit();
  arrayCommit.aniadirCommit(4, 100, 100, "Excelente", "2024-04-10");
  arrayCommit.aniadirCommit(4, 100, 100, "Excelente", "2024-04-15");
  expect(arrayCommit.calcularFrecuenciaCommits()).toEqual("Regular");
});

it("El array de commits deberia de mostrar el ultimo commit como frecuencia Deficiente con diferencia > 7 dias", () => {
  const arrayCommit = new ArrayCommit();
  arrayCommit.aniadirCommit(4, 100, 100, "Excelente", "2024-04-10");
  arrayCommit.aniadirCommit(4, 100, 100, "Excelente", "2024-04-25");
  expect(arrayCommit.calcularFrecuenciaCommits()).toEqual("Deficiente");
});


    
});
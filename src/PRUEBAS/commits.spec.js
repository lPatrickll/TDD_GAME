import ArrayCommit from "../OBJETOS/commitsArray";

describe("Prueba Lista de commits", () => {
    let arrayCommit = new ArrayCommit();


    // Tercera Historia de Usuario -> Patrick *********************************
  
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


    
});
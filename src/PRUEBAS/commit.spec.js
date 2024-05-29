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

    // ********************************************************************
  // 7ta HU Arturo

  it("Deberia devolver cero para cantidad de lineas de cobertura", () => {
    let commit2=new Commit(4,2,0);
    
    expect(commit2.getCobertura()).toEqual(0);
  });

  it("Deberia devolver 0 para cobertura igual a 0", () => {
    let commit2=new Commit(4,2,0);
    expect(commit2.getCobertura()).toEqual(0);
  });

  it("El commit deberia de devolver 10 de porcentaje de cobertura", () => {
    let commit2=new Commit(4,2,10);
    expect(commit2.getCobertura()).toEqual(10);
  });

  it("El commit deberia de devolver 100% de porcentaje de cobertura", () => {
    let commit2=new Commit(4,2,100);
    expect(commit2.getCobertura()).toEqual(100);
  });

  it("El commit deberia de devolver 50% de porcentaje de cobertura enviado como parametro", () => {
    let commit2=new Commit(4,2,50);
    expect(commit2.getCobertura()).toEqual(50);
  });

  it("El commit deberia de devolver un de porcentaje de cobertura enviado por parametro", () => {
    let commit2=new Commit(4,4,100);
    expect(commit2.getCobertura()).toEqual(100);
  });

  it("El commit deberia de devolver un de porcentaje de cobertura como entrada", () => {
    let commit2=new Commit(4,100,100);
    expect(commit2.getCobertura()).toEqual(100);
  });

  it("El commit deberia de devolver un porcentaje de cobertura enviado como parametro", () => {
    let commit2=new Commit(4,100,5);
    expect(commit2.getCobertura()).toEqual(5);
  });

    
});
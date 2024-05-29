import Commit from "../OBJETOS/commit";
import ArrayCommit from "../OBJETOS/commitsArray";
import Proyecto from "../OBJETOS/proyecto";
import ArrayProyectos from "../OBJETOS/proyectosArray";

describe("Ingresar Proyectos", () => {
  // (INICIO PROYECTO) -> FABIO *************************************
  let arrayProyectos = new ArrayProyectos();
  let commit = new Commit();
  let arrayCommit = new ArrayCommit();
  let proyecto;
  let proyectoEliminarUnCommit;

  beforeEach(() => {
    arrayProyectos = new ArrayProyectos();
    commit = new Commit();
    arrayCommit = new ArrayCommit();

    proyecto = new Proyecto("Proyecto 1");
  });

  it("Si no ingreso nada, deberia devolverme un array de proyectos vacio", () => {
    expect(arrayProyectos.getProyectos()).toEqual([]);
  });

  it("Si ingreso un proyecto, deberia devolverme un array con ese proyecto", () => {
    arrayProyectos.aniadirProyecto("Proyecto1");
    expect(arrayProyectos.getProyectos()).toEqual(["Proyecto1"]);
  });

  it("Si ingreso 2 proyectos, deberia devolverme un array con esos 2 proyectos", () => {
    arrayProyectos.aniadirProyecto("Proyecto1");
    arrayProyectos.aniadirProyecto("Proyecto2");
    expect(arrayProyectos.getProyectos()).toEqual(["Proyecto1", "Proyecto2"]);
  });
  // ************************************************************************

  // Segunda Historia de Usuario -> Patrick *********************************
  it("Se debe borrar un proyecto", () => {
    arrayProyectos.aniadirProyecto("Proyecto1");
    arrayProyectos.borrarProyecto("Proyecto1");
    expect(arrayProyectos.getProyectos()).toEqual([]);
  });

  it("Se debe borrar un proyecto", () => {
    arrayProyectos.aniadirProyecto("Proyecto1");
    arrayProyectos.aniadirProyecto("Proyecto2");
    arrayProyectos.borrarProyecto("Proyecto1");
    expect(arrayProyectos.getProyectos()).toEqual(["Proyecto2"]);
  });
  // ************************************************************************

  // Tercera Historia de Usuario -> Patrick *********************************


  it("debería añadir un commit correctamente", () => {
    proyecto.aniadirCommit(3, 100, 80);
    expect(proyecto.mostrarCommits()).toEqual([
      { cantPruebas: 3, cantLineas: 100, cobertura: 80 }
    ]);
  });
  // ********************************************************************
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

  it("el proyecto deberia de mostrar el commit añadido, incluyendo el porcentaje de cobertura calculado", () => {
    const proyecto = new Proyecto("Proyecto2");
    proyecto.aniadirCommitFinal(10,10,10,10);
    let expectedArray = [{
      cantPruebas: 10,
      cantPruebasAprob:10,
      cantLineas: 10,
      cobertura: 10,
      recomendacion: "Buen trabajo en las pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas."
    }];
    expect(proyecto.mostrarCommitCompleto()).toEqual(expectedArray);
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


  it("Debería mostrar un ranking de proyectos ordenado por puntuación general", () => {
    arrayProyectos.aniadirProyecto("Proyecto 1");
    arrayProyectos.aniadirProyecto("Proyecto 2");
    arrayProyectos.aniadirProyecto("Proyecto 3");

    // Supongamos que Proyecto 1 tiene mayor puntuación, luego Proyecto 2, y finalmente Proyecto 3
    arrayProyectos.proyectosArray[0].calcularPuntuacionGeneral = jest.fn(() => 90);
    arrayProyectos.proyectosArray[1].calcularPuntuacionGeneral = jest.fn(() => 80);
    arrayProyectos.proyectosArray[2].calcularPuntuacionGeneral = jest.fn(() => 70);

    const ranking = arrayProyectos.rankingProyectos().map(proyecto => proyecto.getTitulo());

    expect(ranking).toEqual(["Proyecto 1", "Proyecto 2", "Proyecto 3"]);
  });

  it("Debería mostrar un ranking de proyectos ordenado por puntuación general", () => {
    arrayProyectos.aniadirProyecto("Proyecto 1");
    arrayProyectos.aniadirProyecto("Proyecto 2");
    arrayProyectos.aniadirProyecto("Proyecto 3");

    // Supongamos que Proyecto 1 tiene mayor puntuación, luego Proyecto 2, y finalmente Proyecto 3
    arrayProyectos.proyectosArray[0].calcularPuntuacionGeneral = jest.fn(() => 90);
    arrayProyectos.proyectosArray[1].calcularPuntuacionGeneral = jest.fn(() => 80);
    arrayProyectos.proyectosArray[2].calcularPuntuacionGeneral = jest.fn(() => 70);

    const ranking = arrayProyectos.rankingProyectos().map(proyecto => proyecto.getTitulo());

    expect(ranking).toEqual(["Proyecto 1", "Proyecto 2", "Proyecto 3"]);
  });

  it('debería devolver la puntuación general correcta', () => {
    // Configuración de la prueba
    const proyecto = new Proyecto('Proyecto de ejemplo');
    // Supongamos algunos valores de puntaje para las pruebas
    jest.spyOn(proyecto, 'getPuntajePruebas').mockReturnValue(90);
    // Supongamos algunos valores de puntaje para las líneas de código
    jest.spyOn(proyecto, 'getPuntajeLineasCodigo').mockReturnValue(80);
    // Supongamos algunos valores de puntaje para la cobertura
    jest.spyOn(proyecto, 'getPorcentajeCobertura').mockReturnValue(85);

    // Ejecutar el método que estamos probando
    const puntuacionGeneral = proyecto.calcularPuntuacionGeneral();

    // Comprobar si la puntuación general es la esperada
    expect(puntuacionGeneral).toBeCloseTo((90 + 80 + 85) / 3, 2);
    // Tenga en cuenta que toBeCloseTo se utiliza para comparar números de punto flotante con una cierta precisión.
    // 2 indica que queremos que los valores sean iguales dentro de dos lugares decimales.
  });
});
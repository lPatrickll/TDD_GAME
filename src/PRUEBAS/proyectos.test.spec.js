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

  it("Se debe mostrar un commit a un array de commits", () => {
    let cantPruebas = 1;
    let cantLineas = 10;
    let cobertura = 15;
    // arrayCommit.añadirCommit(cantPruebas, cantLineas, cobertura);
    expect(arrayCommit.mostrarCommit()).toEqual([]);
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

  it("debería añadir un commit correctamente", () => {
    proyecto.aniadirCommit(3, 100, 80);
    expect(proyecto.mostrarCommits()).toEqual([
      { cantPruebas: 3, cantLineas: 100, cobertura: 80 }
    ]);
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
    proyecto.aniadirCommitConPruebasAprob(2, 4, 4,1);

    expect(proyecto.getPuntajePruebas()).toEqual(50);
  });

  it("Se debe mostrar un commit con pruebas aprobadas", () => {
    arrayCommit.aniadirCommitConCantPruebAprob(2, 20, 30,2);
    let expectedArray = [{
      cantPruebas: 2,
      cantPruebasAprob:2,
      cantLineas: 20,
      cobertura: 30
    }];
    expect(arrayCommit.mostrarCommitConPruebasAprob()).toEqual(expectedArray);
  });

  it("El proyecto deberia de mostrar commits con pruebas aprobadas", () => {
    const proyecto = new Proyecto("Proyecto2");
    proyecto.aniadirCommitConPruebasAprob(2, 20, 30,2);
    let expectedArray = [{
      cantPruebas: 2,
      cantPruebasAprob:2,
      cantLineas: 20,
      cobertura: 30
    }];
    expect(proyecto.mostrarCommitsConPruebasAprob()).toEqual(expectedArray);
  });

  it("El proyecto deberia de devolver el puntaje de 100% todas las pruebas aprobadas", () => {

    const proyecto = new Proyecto("Proyecto2");
    proyecto.aniadirCommitConPruebasAprob(2, 4, 4,2);
    proyecto.aniadirCommitConPruebasAprob(2, 4, 4,2);
    proyecto.aniadirCommitConPruebasAprob(2, 4, 4,2);
    proyecto.aniadirCommitConPruebasAprob(2, 4, 4,2);

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
    expect(proyecto.getPuntajeLineasCodigo()).toEqual(80);
  });
  // ********************************************************************
});
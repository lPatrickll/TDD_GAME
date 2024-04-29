import Commit from "../OBJETOS/commit";
import ArrayProyectos from "../OBJETOS/proyectosArray";

describe("Ingresar Proyectos", () => {
  // (INICIO PROYECTO) -> FABIO *************************************
  let arrayProyectos = new ArrayProyectos();
  let commit = new Commit();

  beforeEach(() => {
    arrayProyectos = new ArrayProyectos();
    commit = new Commit();
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

  it("Se debe añadir un la cantidad de prueba para un commit", () => {
    let cantPruebas = 1;
    let cantLineas = 10;

    let commit2 = new Commit(cantPruebas, cantLineas);
    expect(commit2.getCantLineas()).toEqual(10);
  });
});
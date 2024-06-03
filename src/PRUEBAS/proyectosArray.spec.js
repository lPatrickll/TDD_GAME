import Proyecto from "../OBJETOS/proyecto";
import ArrayProyectos from "../OBJETOS/proyectosArray";

describe("Ingresar Proyectos", () => {
  // (INICIO PROYECTO) -> FABIO *************************************
  let arrayProyectos = new ArrayProyectos();


  beforeEach(() => {
    arrayProyectos = new ArrayProyectos();

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

  // ********************************************************************

  /* Ranking de proyectos */
  it("Deberia pedirle el ranking y devolver un array vacio", () => {
    expect(arrayProyectos.obtenerRankingDeProyectos()).toEqual([]);
  });

  it("Si solo le ingreso un proyecto deberia devolverme ese mismo proyecto", () => {
    let proyecto1 = new Proyecto("Proyecto 1")
    //proyecto1.aniadirCommit(10, 50, 20, "Buena", "01/06/2024-13:00", 1);
    arrayProyectos.aniadirProyectoObj(proyecto1);

    let expectedArray = [{
      "titulo": "Proyecto 1",
      "puntajeTotal": 0
    }];

    expect(arrayProyectos.obtenerRankingDeProyectos()).toEqual(expectedArray);
  });

  /*
  it("Si solo le ingreso 2 proyectos deberia devolverme un ranking de proyectos sin ordenar", () => {
    proyecto.aniadirCommit(10, 50, 20, "Buena", "01/06/2024-13:00", 1);
    proyecto.aniadirCommit(0, 40, 50, "Excelente", "2/06/2024-12:00", 2);
    proyecto.aniadirCommit(0, 10, 40, "Regular", "3/06/2024-11:00", 3);
    expect(arrayProyectos.obtenerRankingDeProyectos()).toEqual(["Proyecto1", "Proyecto2"]);
  });*/
});
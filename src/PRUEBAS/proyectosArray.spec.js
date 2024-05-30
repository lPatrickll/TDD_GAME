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
  // 6ta HU Salvador


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
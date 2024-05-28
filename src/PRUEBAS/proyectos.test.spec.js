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
  
  // ********************************************************************
  // 8tavo Salvador
  it("El commit debería generar la recomendacion por defecto", () => {
    let commitrec = new Commit(4, 100, 100);
    commitrec.setPruebasAprob(4);
    let texto = "Buen trabajo en las pruebas aprobadas. ";
    expect(commitrec.getRecomendacion()).toEqual(texto);
  });

  it("El commit debería generar una recomendación positiva debido a las pruebas aprobadas", () => {
    let commitrec = new Commit(4, 100, 100);
    commitrec.setPruebasAprob(4);
    let texto = "Buen trabajo en las pruebas aprobadas. ";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  it("El commit debería generar una recomendación para mejorar debido a la poca cantidad de pruebas aprobadas", () => {
    let commitrec = new Commit(4, 100, 100);
    commitrec.setPruebasAprob(2);
    let texto = "Se recomienda mejorar la cantidad de pruebas aprobadas. ";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  it("El commit debería generar una recomendación debido a la cantidad regular de pruebas aprobadas", () => {
    let commitrec = new Commit(4, 100, 100);
    commitrec.setPruebasAprob(3);
    let texto = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. ";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  it("Generacion de un mensaje adicional de recomendacion referenciado a la cantidad de lineas de codigo", () => {
    let commitrec = new Commit(4, 501, 100);
    commitrec.setPruebasAprob(3);
    let texto = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. ";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  it("El commit deberia generar una recomendacion positiva en cuanto al manejo de la cantidad de las lineas de codigo", () => {
    let commitrec = new Commit(4, 102, 100);
    commitrec.setPruebasAprob(3);
    let texto = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. Buen manejo de la cantidad de líneas de código. ";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });

  it("Generacion de un ultimo mensaje de recomendacion en base a la cobertura del commit dentro del proyecto", () => {
    let commitrec = new Commit(4, 102, 60);
    commitrec.setPruebasAprob(3);
    let texto = "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. Buen manejo de la cantidad de líneas de código. La cobertura de código es baja, considera añadir más pruebas.";
    expect(commitrec.generarRecomendacion()).toEqual(texto);
  });
  
  // ********************************************************************
  // 2do Salvador
  it("El commit debería almacenar y devolver correctamente la complejidad", () => {
    let commit = new Commit(4, 100, 100, "Excelente");
    expect(commit.getComplejidad()).toEqual("Excelente");
  });
  
});
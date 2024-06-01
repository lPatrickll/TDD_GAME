
import Proyecto from "../OBJETOS/proyecto";
import fs from 'fs';
import path from 'path'; // Asegúrate de importar path

describe("Proyecto", () => {
  let proyecto;
  beforeEach(() => {
    proyecto = new Proyecto("Proyecto 1");
  });

  // Tercera Historia de Usuario -> Patrick *********************************


  it("debería añadir un commit correctamente", () => {
    proyecto.aniadirCommit(3, 100, 80, "regular");
    expect(proyecto.mostrarCommits()).toEqual([
      { cantPruebas: 3, cantLineas: 100, cobertura: 80, complejidad: "regular", recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ", frecuencia: "Regular" }
    ]);
  });



  // 4ta HU -> Fabio ****************************************************


  it("Deberia eliminar un commit desde un objeto proyecto", () => {
    const proyecto = new Proyecto("Elim");
    proyecto.aniadirCommit(4, 4, 4);
    proyecto.eliminarUltimoCommit();
    let expectedArray = [
      { cantPruebas: 4, cantLineas: 4, cobertura: 4 }, { cantPruebas: 10, cantLineas: 9, cobertura: 10 }];
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
    proyecto.aniadirCommit(2, 4, 4, "regular");

    expect(proyecto.getPuntajePruebas()).toEqual(0);
  });



  it("El proyecto deberia de mostrar commits con pruebas aprobadas", () => {
    const proyecto = new Proyecto("Proyecto2");
    proyecto.aniadirCommit(2, 2, 30, "regular");
    let expectedArray = [{
      cantPruebas: 2,
      cantLineas: 2,
      cobertura: 30,
      complejidad: "regular",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas.",
      frecuencia: "Regular"
    }];
    expect(proyecto.mostrarCommits()).toEqual(expectedArray);
  });

  it("El proyecto deberia de devolver el puntaje de 100% todas las pruebas aprobadas", () => {

    const proyecto = new Proyecto("Proyecto2");
    proyecto.aniadirCommit(2, 4, 4, "regular");
    proyecto.aniadirCommit(2, 4, 4, "regular");
    proyecto.aniadirCommit(2, 4, 4, "regular");
    proyecto.aniadirCommit(2, 4, 4, "regular");

    expect(proyecto.getPuntajePruebas()).toEqual(0);
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




  it("el proyecto deberia de mostrar el commit añadido, incluyendo el porcentaje de cobertura calculado", () => {
    const proyecto = new Proyecto("Proyecto2");
    proyecto.aniadirCommit(10, 10, 10, "regular");
    let expectedArray = [{
      cantPruebas: 10,
      cantLineas: 10,
      cobertura: 10,
      complejidad: "regular",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. La cobertura de código es baja, considera añadir más pruebas.",
      frecuencia: "Regular"
    }];
    expect(proyecto.mostrarCommits()).toEqual(expectedArray);
  });



  it("El proyecto deberia de devolver 0 de porcentaje de cobertura", () => {

    const proyecto = new Proyecto("Proyecto1");
    expect(proyecto.getPorcentajeCobertura()).toEqual(0);
  });

  it("El proyecto deberia de devolver 50 de porcentaje de cobertura para dos commits con 50% de cobertura", () => {
    const proyecto = new Proyecto("Proyecto2");
    proyecto.aniadirCommit(10, 10, 50, 50);
    proyecto.aniadirCommit(10, 10, 50, 50);
    expect(proyecto.getPorcentajeCobertura()).toEqual(50);
  });

  it("El proyecto debería mostrar los commits con la complejidad incluida", () => {
    const proyecto = new Proyecto("Proyecto Complejidad");
    proyecto.aniadirCommit(4, 100, 100, "Excelente");
    let expectedArray = [{
      cantPruebas: 4,
      cantLineas: 100,
      cobertura: 100,
      complejidad: "Excelente",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Regular"
    }];
    expect(proyecto.mostrarCommits()).toEqual(expectedArray);
  });


  const archivoText = '..\/commits.txt';
  const archivoLeido = '..\/archivoLeido.txt';
  const archivoCommits = '..\/archivoCommits.txt';
  const variosCommits = '..\/variosCommits.txt';

  it("El proyecto debería leer un archivo de texto vacio, y devolver un mensaje que diga Achivo Vacio", () => {
    expect(proyecto.ingresarCommitsPor(archivoText)).toEqual("Archivo vacio");
  });

  it("El proyecto debería leer un archivo de texto archivoleido.txt, y devolver un mensaje que diga Achivo Leido", () => {
    expect(proyecto.ingresarCommitsPor(archivoLeido)).toEqual("Archivo leido");
  });

  it("El proyecto debería leer un archivo de texto con el formato especificado que contenga un commit, y mostrar el commit en el array", () => {
    proyecto.ingresarCommitsPor(archivoCommits);
    proyecto.getArrayCommit().calcularFrecuenciaCommits();
    //expect(proyecto.ingresarCommitsPor(archivoCommits)).toEqual("Archivo leido");
    let expectedArray = [{
      idCommit: 1,
      fechaHora: "12/04/2024-08:24",
      cantPruebas: 2,
      cantLineas: 4,
      cobertura: 97,
      complejidad: "Excelente",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Regular"
    }];
    expect(proyecto.mostrarCommits()).toEqual(expectedArray);
  });

  it("El proyecto debería leer un archivo de texto con el formato especificado que contenga varios commits, y mostrar los commits en el array", () => {
    proyecto.ingresarCommitsPor(variosCommits);
    proyecto.getArrayCommit().calcularFrecuenciaCommits();
    let expectedArray = [{
      idCommit: 1,
      fechaHora: "12/04/2024-08:24",
      cantPruebas: 2,
      cantLineas: 4,
      cobertura: 97,
      complejidad: "Excelente",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Regular"
    },
    {
      idCommit: 2,
      fechaHora: "25/06/2024-09:45",
      cantPruebas: 2,
      cantLineas: 7,
      cobertura: 95,
      complejidad: "Regular",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Deficiente"
    },
    {
      idCommit: 3,
      fechaHora: "10/07/2024-11:30",
      cantPruebas: 3,
      cantLineas: 5,
      cobertura: 90,
      complejidad: "Bueno",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Deficiente"
    },
    {
      idCommit: 4,
      fechaHora: "15/08/2024-14:50",
      cantPruebas: 1,
      cantLineas: 8,
      cobertura: 85,
      complejidad: "Excelente",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Deficiente"
    },
    {
      idCommit: 5,
      fechaHora: "22/09/2024-16:15",
      cantPruebas: 4,
      cantLineas: 6,
      cobertura: 92,
      complejidad: "Regular",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Deficiente"
    }
    ];

    expect(proyecto.mostrarCommits()).toEqual(expectedArray);
  });

  it("El proyecto debería leer un contenido con el formato especificado que contenga varios commits, y mostrar los commits en el array", () => {
    const contenidoTxt = `
        1, 12/04/2024-08:24, 2, 4, 97, Excelente
        2, 25/06/2024-09:45, 2, 7, 95, Regular
        3, 10/07/2024-11:30, 3, 5, 90, Bueno
        4, 22/08/2024-14:50, 1, 8, 85, Excelente
        5, 22/08/2024-16:15, 4, 6, 92, Regular
        `;
    proyecto.ingresarCommitsPorContenidoDe(contenidoTxt);
    proyecto.getArrayCommit().calcularFrecuenciaCommits();
    let expectedArray = [{
      idCommit: 1,
      fechaHora: "12/04/2024-08:24",
      cantPruebas: 2,
      cantLineas: 4,
      cobertura: 97,
      complejidad: "Excelente",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Regular"
    },
    {
      idCommit: 2,
      fechaHora: "25/06/2024-09:45",
      cantPruebas: 2,
      cantLineas: 7,
      cobertura: 95,
      complejidad: "Regular",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Deficiente"
    },
    {
      idCommit: 3,
      fechaHora: "10/07/2024-11:30",
      cantPruebas: 3,
      cantLineas: 5,
      cobertura: 90,
      complejidad: "Bueno",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Deficiente"
    },
    {
      idCommit: 4,
      fechaHora: "22/08/2024-14:50",
      cantPruebas: 1,
      cantLineas: 8,
      cobertura: 85,
      complejidad: "Excelente",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Deficiente"
    },
    {
      idCommit: 5,
      fechaHora: "22/08/2024-16:15",
      cantPruebas: 4,
      cantLineas: 6,
      cobertura: 92,
      complejidad: "Regular",
      recomendacion: "Se recomienda mejorar la cantidad de pruebas aprobadas. ",
      frecuencia: "Excelente"
    }
    ];

    expect(proyecto.mostrarCommits()).toEqual(expectedArray);
  });


  it("El proyecto debería leer un contenido vacio, y mostrar un mensaje que diga archivo vacio", () => {
    const contenidoTxt = ``;
    expect(proyecto.ingresarCommitsPorContenidoDe(contenidoTxt)).toEqual("Archivo vacio");
  });

  ////////////////////////////////////////
  it("El proyecto calcula la cantidad de pruebas de un proyecto con 0 commits", () => {

    expect(proyecto.getPuntajeCantPruebas(proyecto.getArrayCommit())).toEqual(8);
  });

  it("El proyecto calcula la cantidad de pruebas de un proyecto con 1 commit con 100% pruebas nuevas", () => {
    proyecto.aniadirCommit(2);
    expect(proyecto.getPuntajeCantPruebas(proyecto.getArrayCommit())).toEqual(20);
  });

  it("El proyecto calcula la cantidad de pruebas de un proyecto con 5 commit con 80% pruebas nuevas", () => {
    proyecto.aniadirCommit(2);
    proyecto.aniadirCommit(2);
    proyecto.aniadirCommit(2);
    proyecto.aniadirCommit(2);
    proyecto.aniadirCommit(0);

    expect(proyecto.getPuntajeCantPruebas(proyecto.getArrayCommit())).toEqual(16);
  });

  it("El proyecto calcula la cantidad de pruebas de un proyecto con 5 commit con 80% pruebas nuevas", () => {
    proyecto.aniadirCommit(2);
    proyecto.aniadirCommit(2);
    proyecto.aniadirCommit(2);
    proyecto.aniadirCommit(0);
    proyecto.aniadirCommit(0);

    expect(proyecto.getPuntajeCantPruebas(proyecto.getArrayCommit())).toEqual(12);
  });

  it("El proyecto calcula la cantidad de lineas de un proyecto con 0 commits", () => {
    expect(proyecto.getPuntajeCantLineas(proyecto.getArrayCommit())).toEqual(8);
  });

  it("El proyecto calcula la cantidad de lineas de un proyecto con un promedio menor a 20 lineas por commit", () => {
    proyecto.aniadirCommit(2, 19);
    expect(proyecto.getPuntajeCantLineas(proyecto.getArrayCommit())).toEqual(20);
  });

  it("El proyecto calcula la cantidad de lineas de un proyecto con un promedio es 20-40 lineas por commit", () => {
    proyecto.aniadirCommit(2, 19);
    proyecto.aniadirCommit(2, 25);
    proyecto.aniadirCommit(2, 25);
    proyecto.aniadirCommit(2, 25);
    proyecto.aniadirCommit(0, 25);
    expect(proyecto.getPuntajeCantLineas(proyecto.getArrayCommit())).toEqual(16);
  });
});

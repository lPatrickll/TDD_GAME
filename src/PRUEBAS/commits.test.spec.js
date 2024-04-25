import ArrayCommits from "../OBJETOS/commitsArray";

describe("Ingresar commit", () => {
  let arrayCommits = new ArrayCommits();

  beforeEach(() => {
    arrayCommits = new ArrayCommits();
  });

  it("Si no ingreso nada, deberia devolverme un array de commits vacio", () => {
    expect(arrayCommits.getCommits()).toEqual([]);
  });

});
import ArrayCommits from "../OBJETOS/commitsArray";

describe("Ingresar commit", () => {
  // COMMITS (INICIO PROYECTO) -> FABIO *************************************
  let arrayCommits = new ArrayCommits();

  beforeEach(() => {
    arrayCommits = new ArrayCommits();
  });

  it("Si no ingreso nada, deberia devolverme un array de commits vacio", () => {
    expect(arrayCommits.getCommits()).toEqual([]);
  });

  it("Si ingreso un commit, deberia devolverme un array con ese commit", () => {
    arrayCommits.aniadirCommit("Commit1");
    expect(arrayCommits.getCommits()).toEqual(["Commit1"]);
  });

  it("Si ingreso 2 un commits, deberia devolverme un array con esos 2 commits", () => {
    arrayCommits.aniadirCommit("Commit1");
    arrayCommits.aniadirCommit("Commit2");
    expect(arrayCommits.getCommits()).toEqual(["Commit1", "Commit2"]);
  });
  // ************************************************************************

});
import Commit from "./commit"
class ArrayCommits{
    constructor(){
        this.commitsArray = [];
    }

    aniadirCommit(tituloCommit){
        const nuevoCommit = new Commit(tituloCommit);
        this.commitsArray.push(nuevoCommit);
    }

    getCommits(){
        return this.commitsArray;
    }

    getCommits(){
        return this.commitsArray.map(commit => commit.getTitulo());
    }
};

export default ArrayCommits;
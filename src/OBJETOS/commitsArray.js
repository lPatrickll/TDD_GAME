//import Commit from "./commit"
class ArrayCommits{
    constructor(){
        this.commitsArray = [];
    }
/*
    añadirCommit(tituloCommit){
        const nuevoCommit = new Commit(tituloCommit);
        this.commitsArray.push(nuevoCommit);
    }*/

    getCommits(){
        return this.commitsArray;
    }
};

export default ArrayCommits;
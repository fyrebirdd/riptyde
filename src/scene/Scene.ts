import { BaseObject } from "../objects/BaseObject";

class Scene{

    private listOfObjects:BaseObject[];

    constructor(){
        this.listOfObjects = [];
    }

    Add(obj:BaseObject){
        this.listOfObjects.push(obj)
    }
}

export {Scene};
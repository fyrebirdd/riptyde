import { RenderableObject } from "../objects/RenderableObject";

class Scene{

    private listOfObjects:RenderableObject[];

    constructor(){
        this.listOfObjects = [];
    }

    public Add(obj:RenderableObject){
        this.listOfObjects.push(obj)
    }

    public _getListOfObjects(){
        return this.listOfObjects;
    }
}

export {Scene};
import { Camera } from "../objects/Camera";
import { RenderableObject } from "../objects/RenderableObject";
import { Scene } from "../scene/Scene";

export class WebGPU_Renderer{

    constructor(){

    }

    public render(scene:Scene, camera:Camera){
        scene._getListOfObjects().forEach((obj) => {
            
        });
    }

    private DrawObject(obj:RenderableObject){

    }
}
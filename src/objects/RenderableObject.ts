import WebGPU from "../WebGPU/WebGPUState";
import { Material } from "./materials/Material";
import { BaseMesh } from "./BaseMesh";
import { BaseObject } from "./BaseObject"

class RenderableObject extends BaseObject{

    private mesh:BaseMesh;
    private material:Material;

    constructor(mesh:BaseMesh, material:Material){
        super();

        this.mesh = mesh;
        this.material = material;
    }

    public GetMesh(){
        return this.mesh;
    }

    public GetMaterial(){
        return this.material;
    }

}

export {RenderableObject}
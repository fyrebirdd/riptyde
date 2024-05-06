import { Mat4, Vec3, mat4, vec3 } from "wgpu-matrix";
import { DegToRad } from "../math/degToRad";

class BaseObject{

    public position:Vec3;
    public rotation:Vec3;
    public scale:Vec3;

    protected up = vec3.fromValues(0,1,0);
    protected isCamera:boolean = false;

    protected ModelToWorldMatrix:Mat4;

    constructor(){
        this.position = vec3.fromValues(0,0,0);
        this.rotation = vec3.fromValues(0,0,0);
        this.scale = vec3.fromValues(1,1,1);

        this.ModelToWorldMatrix = mat4.create();
        this.UpdateModelToWorldMatrix();
    }

    private UpdateModelToWorldMatrix(){
        let newTransformationMatrix = mat4.create();
        mat4.scale(
            newTransformationMatrix, 
            this.isCamera ? vec3.fromValues(1,1,1) : this.scale, 
            newTransformationMatrix
        );

        mat4.rotateX(newTransformationMatrix, DegToRad(this.rotation[0]), newTransformationMatrix);
        mat4.rotateY(newTransformationMatrix, DegToRad(this.rotation[1]), newTransformationMatrix);
        mat4.rotateZ(newTransformationMatrix, DegToRad(this.rotation[2]), newTransformationMatrix);

        mat4.translate(newTransformationMatrix, this.position, newTransformationMatrix);

        this.ModelToWorldMatrix = newTransformationMatrix;
    }

    public GetModelToWorldMatrix(){
        return this.ModelToWorldMatrix;
    }

    public GetWorldToModelMatrix(){
        return mat4.inverse(this.ModelToWorldMatrix);
    }

    public LookAt(target:Vec3){
        mat4.lookAt(this.position, target, this.up, this.ModelToWorldMatrix);
    }
}

export {BaseObject};
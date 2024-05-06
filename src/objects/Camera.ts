import { Mat4, mat4 } from "wgpu-matrix";
import { BaseObject } from "./BaseObject";

class Camera extends BaseObject{
    
    protected ViewToClipMatrix:Mat4;

    protected fov;
    protected height;
    protected width;
    protected near;
    protected far;

    constructor(fov:number, width:number, height:number, near:number, far:number){
        super();
        this.ViewToClipMatrix = mat4.create();

        this.fov = fov;
        this.width = width;
        this.height = height;
        this.near = near;
        this.far = far;

        this.isCamera = true;

        this.UpdateViewToClipMatrix();
    }

    public GetWorldToCameraMatrix(){
        return this.GetWorldToModelMatrix();
    }

    public UpdateViewToClipMatrix(){
        let newProjectionMatrix = mat4.create();
        let degToRad = Math.acos(-1.0)/180;

        mat4.perspective(this.fov*degToRad, this.width/this.height, this.near, this.far, newProjectionMatrix);
        this.ViewToClipMatrix = newProjectionMatrix;
    }

    public GetViewToClipMatrix(){
        return this.ViewToClipMatrix;
    }

    public GetClipToViewMatrix(){
        return mat4.inverse(this.ViewToClipMatrix);
    }
    
}

export {Camera}
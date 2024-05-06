import { Vec2, Vec3 } from "wgpu-matrix";

export { OBJ_Loader } from "./OBJ_Loader";

export class Vertex{
    position: Vec3
    normal?: Vec3
    uv?: Vec2

    constructor(p:Vec3, uv:Vec3, n:Vec2){
        this.position = p;
        this.normal = n;
        this.uv = uv;
    }

    GetStrideInBytes() {
        let stride = 3;
        if (this.normal !== undefined) stride += 3;
        if (this.uv !== undefined) stride += 2;
        return stride * Float32Array.BYTES_PER_ELEMENT;
    }

    GetAsArray(){
        let array = [this.position[0], this.position[1], this.position[2]];

        if (this.normal !== undefined) {
            array.push(this.normal[0], this.normal[1], this.normal[2]);
        }
        if (this.uv !== undefined) {
            array.push(this.uv[0], this.uv[1]);
        }
        return array;
    }
}

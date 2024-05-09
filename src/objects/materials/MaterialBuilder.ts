import { BindGroup } from "./BindGroup";
import { Material } from "./Material";
import { Shader } from "./Shader";

export class MaterialBuilder{

    private shader?:Shader;
    private bindGroups: BindGroup[];

    constructor(){
        this.bindGroups = [];
    }

    public SetShader(s: Shader){
        this.shader = s;
    }

    public AddBindGroup(bg: BindGroup){
        this.bindGroups.push(bg);
    }

    public Build(): Material{
        var newMat = new Material();

        //BUILD MATERIAL

        return newMat;
    }
}
import WebGPU from "../../WebGPU/WebGPUState";
import { UniformGroup } from "./UniformGroup.js";

class BaseMaterial {

    private shaderModule: GPUShaderModule;
    private vertexEntry?:string;
    private fragmentEntry?:string;

    private bindGroups:UniformGroup[]

    constructor(
        name:string,
        shaderCode:string, 
        vertexShaderEntryFunction?:string, 
        fragmentShaderEntryFunction?:string,
        
    ){

        this.fragmentEntry = fragmentShaderEntryFunction;
        this.vertexEntry = vertexShaderEntryFunction;
        this.bindGroups = [];
        
    }

    public AddUnifromGroup(group: UniformGroup){
        this.bindGroups.push(group);
    }

    public _buildBindGroups(){ // TODO WHERE I LEFT OFF
        
    }

    public _getBindGroupLayouts(){
        let bindGroupLayouts:GPUBindGroupLayout[] = [];

        this.bindGroups.forEach((bindGroup)=> {
            bindGroupLayouts.push(WebGPU.GetDevice().createBindGroupLayout(bindGroup.GetBindGroupLayout()));
        });
        return bindGroupLayouts;
    }   

    public _getShaderModule(){
        return this.shaderModule;
    }
    public _getVertexEntryFunctionName(){
        return this.vertexEntry;
    }
    public _getFragmentEntryFunctionName(){
        return this.fragmentEntry;
    }

}

export {BaseMaterial};
import { WebGPU } from "../riptyde";

class BaseMaterial {

    private shaderModule: GPUShaderModule;
    private vertexEntry:string;
    private fragmentEntry:string;

    private bindGroups:Map<number,GPUBindGroupEntry[]>

    constructor(
        name:string,
        shaderCode:string, 
        vertexShaderEntryFunction='vertex_main', 
        fragmentShaderEntryFunction='fragment_main',
        sourceMap?:object,
        compilationHints?:GPUShaderModuleCompilationHint[],
    ){

        this.fragmentEntry = fragmentShaderEntryFunction;
        this.vertexEntry = vertexShaderEntryFunction;
        this.bindGroups = new Map();

        let newShaderModuleDescriptor: GPUShaderModuleDescriptor = {
            label: name,
            code: shaderCode,
        }

        if (sourceMap) newShaderModuleDescriptor.sourceMap = sourceMap;
        if (compilationHints) newShaderModuleDescriptor.compilationHints = compilationHints;

        this.shaderModule = WebGPU.GetDevice().createShaderModule(newShaderModuleDescriptor);
    }

    public _getBindGroupLayouts(){

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
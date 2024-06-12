import WebGPU from "../WebGPU/WebGPUState";

export class Shader{

    private shaderModule:GPUShaderModule;
    private vertexEntry?:string;
    private fragmentEntry?:string;

    constructor(
        code:string, 
        compilationHints:GPUShaderModuleCompilationHint[], 
        sourceMap:object|undefined,
        vertexFunction?:string,
        fragmentFunction?:string,
    ){
        this.shaderModule = WebGPU.GetDevice().createShaderModule({
            code,
            compilationHints,
            sourceMap,
        });

        this.vertexEntry = vertexFunction;
        this.fragmentEntry = fragmentFunction;
    }

    public GetShaderModule(){
        return this.shaderModule;
    }
    public GetVertexEntry(){
        return this.vertexEntry;
    }
    public GetFragmentEntry(){
        return this.fragmentEntry;
    }
}
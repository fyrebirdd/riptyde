import WebGPU from "../../WebGPU/WebGPUState";

export class Shader{

    private shaderModule:GPUShaderModule;

    constructor(code:string, compilationHints:GPUShaderModuleCompilationHint[], sourceMap:object|undefined){
        this.shaderModule = WebGPU.GetDevice().createShaderModule({
            code,
            compilationHints,
            sourceMap,
        });
    }

    public GetShaderModule(){
        return this.shaderModule;
    }
}
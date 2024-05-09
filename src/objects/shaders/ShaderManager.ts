import WebGPU from "../../WebGPU/WebGPUState";

type ShaderName = string;

class ShaderManager{
    
    private static instance:ShaderManager;

    private shadersLoaded:Map<ShaderName, GPUShaderModule>

    private constructor(){
        this.shadersLoaded = new Map();
    }

    public static getInstance(){
        if (!ShaderManager.instance){
            ShaderManager.instance = new ShaderManager();
        }
        return ShaderManager.instance;
    };

    public LoadShader(
        name:string, 
        shaderCode:string, 
        sourceMap?:object,
        compilationHints?:GPUShaderModuleCompilationHint[],
    ): GPUShaderModule{
        
        if (this.shadersLoaded.has(name)){
            return this.shadersLoaded.get(name)!;
        }

        let newShaderModuleDescriptor: GPUShaderModuleDescriptor = {
            label: name,
            code: shaderCode,
        }

        if (sourceMap) newShaderModuleDescriptor.sourceMap = sourceMap;
        if (compilationHints) newShaderModuleDescriptor.compilationHints = compilationHints;

        let newModule = WebGPU.GetDevice().createShaderModule(newShaderModuleDescriptor);

        this.shadersLoaded.set(name, newModule);
        return newModule;
    }
}

const ShaderLoader = ShaderManager.getInstance();
export default ShaderLoader;
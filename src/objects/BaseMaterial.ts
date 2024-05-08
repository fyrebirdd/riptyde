import WebGPU from "../WebGPU/WebGPUState";

interface UnifromGroupEntries{
    shaderVisibility:GPUShaderStageFlags;
}

interface UniformGroupBufferEntry extends UnifromGroupEntries{
    data:any[], 
    bufferType: GPUBufferBindingType;
    hasDynamicOffset:boolean; 
    minBindingSize:number;
}

class UniformGroup{
    groupLayout?:GPUBindGroupLayoutDescriptor;
    entries:UnifromGroupEntries[];

    constructor(){
        this.entries = [];
    }

    public AddBufferToGroup(data:any[], 
        shaderVisibility:GPUShaderStageFlags,
        bufferType: GPUBufferBindingType,
        hasDynamicOffset:boolean = false, 
        minBindingSize:number = 0
    ){
        let newEntry:UniformGroupBufferEntry = {
            data,
            bufferType,
            hasDynamicOffset,
            minBindingSize,
            shaderVisibility
        }
        this.entries.push(newEntry);
        this.UpdateBindGroupLayout();
    }

    private UpdateBindGroupLayout(){
        let newEntryArray:GPUBindGroupLayoutEntry[] = [];

        if (this.entries.length <=0){
            console.error("Cannot update empty bind group");
            return false;
        }

        this.entries.forEach((entry, index) => {//TODO Handle other types of uniform data

            if ((entry as UniformGroupBufferEntry).bufferType){
                let bufferEntry = entry as UniformGroupBufferEntry;
                newEntryArray.push({
                    binding: index,
                    visibility: bufferEntry.shaderVisibility,
                    buffer : {
                        type: bufferEntry.bufferType,
                        hasDynamicOffset: bufferEntry.hasDynamicOffset,
                        minBindingSize: bufferEntry.minBindingSize
                    }
                });
            }
        })

        this.groupLayout = {
            entries: newEntryArray
        }
    }

    public GetBindGroupLayout(){
        this.UpdateBindGroupLayout();
        return this.groupLayout!;
    }
}

class BaseMaterial {

    private shaderModule: GPUShaderModule;
    private vertexEntry:string;
    private fragmentEntry:string;

    private bindGroups:UniformGroup[]

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
        this.bindGroups = [];

        let newShaderModuleDescriptor: GPUShaderModuleDescriptor = {
            label: name,
            code: shaderCode,
        }

        if (sourceMap) newShaderModuleDescriptor.sourceMap = sourceMap;
        if (compilationHints) newShaderModuleDescriptor.compilationHints = compilationHints;

        this.shaderModule = WebGPU.GetDevice().createShaderModule(newShaderModuleDescriptor);
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
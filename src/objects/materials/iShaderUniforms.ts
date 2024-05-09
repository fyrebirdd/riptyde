export interface UnifromGroupEntries{
    shaderVisibility:GPUShaderStageFlags;
}

export interface UniformGroupBufferEntry extends UnifromGroupEntries{
    data:any[], 
    bufferType: GPUBufferBindingType;
    hasDynamicOffset:boolean; 
    minBindingSize:number;
}
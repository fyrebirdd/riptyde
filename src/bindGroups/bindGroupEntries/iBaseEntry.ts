export interface iBaseGroupEntry{
    binding:number;
    shaderVisibility:GPUShaderStageFlags;
    
    layoutEntry:GPUBindGroupLayoutEntry;
    groupEntry:GPUBindGroupEntry;
}
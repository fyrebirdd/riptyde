import { iBaseGroupEntry } from "./iBaseEntry";

export class BindGroupBufferEntry implements iBaseGroupEntry{
    binding: number;
    shaderVisibility: number;

    layoutEntry: GPUBindGroupLayoutEntry;
    groupEntry: GPUBindGroupEntry;

    bufferType: GPUBufferBindingType;
    buffer: GPUBuffer;

    constructor(
        binding:number,
        shaderVisibility:number, 
        bufferType:GPUBufferBindingType, 
        buffer: GPUBuffer){

        this.binding = binding;
        this.shaderVisibility = shaderVisibility;
        this.bufferType = bufferType;
        this.buffer = buffer;

        this.layoutEntry = {
            binding: this.binding,
            visibility: this.shaderVisibility,
            buffer: {
                type: this.bufferType
            }
        };

        this.groupEntry = {
            binding: this.binding,
            resource: {
                buffer:this.buffer,
            }
        }
    }

    
}
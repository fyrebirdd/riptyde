import { UniformGroupBufferEntry, UnifromGroupEntries } from "./iShaderUniforms";

export class UniformGroup{
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
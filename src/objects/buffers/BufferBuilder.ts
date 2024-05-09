import { Buffer } from "./Buffer";
import { BufferEntryType } from "./BufferAlignmentSizeMap";

export class BufferBuilder{

    private entries:BufferBuilderDataEntry[];
    private usage:GPUBufferUsage;

    constructor(usage: GPUBufferUsage){
        this.entries = [];
        this.usage = usage;
    }

    public AddEntry(entry:BufferBuilderDataEntry){
        this.entries.push(entry);
    }

    public Build(): Buffer{
        return new Buffer(this.entries, this.usage);
    }
}

export interface BufferBuilderDataEntry{
    label:string,
    type:BufferEntryType,
    data: any
}
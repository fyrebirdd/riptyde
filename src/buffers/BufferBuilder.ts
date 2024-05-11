import { Buffer } from "./Buffer";
import {BufferDataTypeInfo, BufferDataTypes, GetBufferDataType} from "./BufferAlignmentSizeMap";

export class BufferBuilder{

    private entries:BufferDataEntry[];
    private usage:GPUBufferUsageFlags;

    constructor(usage: GPUBufferUsageFlags){
        this.entries = [];
        this.usage = usage;
    }

    public AddEntry(entry:BufferDataEntry){
        this.entries.push(entry);
    }

    public Build(): Buffer{
        return new Buffer(this.entries, this.usage);
    }
}

export class BufferDataEntry{
    label:string;
    type:BufferDataTypes;
    typeData: BufferDataTypeInfo
    data!: Float32Array | Uint32Array | Int32Array;

    constructor(label:string, type:BufferDataTypes, data:number[]){
        this.label = label;
        this.type = type;
        this.typeData = GetBufferDataType(type);

        if (type.includes("f") || type.includes("f32")){
            this.data = new Float32Array(data);
        }
        else if (type.includes("u") || type.includes("u32")){
            this.data = new Uint32Array(data);
        }
        else if (type.includes("i") || type.includes("i32")){
            this.data = new Int32Array(data);
        }
    }
}
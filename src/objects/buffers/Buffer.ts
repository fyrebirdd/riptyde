import BufferDataTypeMap from "./BufferAlignmentSizeMap";
import { BufferBuilderDataEntry } from "./BufferBuilder";

export class Buffer{

    private dataMap: Map<string, BufferDataPosition>

    private buffer:GPUBuffer;

    private totalBufferSize:number = 0;
    private largestAlignSize:number = 0;

    constructor(entries: BufferBuilderDataEntry[], usage:GPUBufferUsage){
        this.dataMap = new Map();

        entries.forEach((entry) => {
            let alignmentSize = BufferDataTypeMap.get(entry.type)!;

            let dataPosition:BufferDataPosition = {
                bytePosition: this.totalBufferSize,
                sizeOfData: alignmentSize.s
            };

            if (alignmentSize.a > this.largestAlignSize) this.largestAlignSize = alignmentSize.a;

            this.dataMap.set(entry.label, dataPosition);

            let trueSize = alignmentSize.s < alignmentSize.a ? alignmentSize.a : alignmentSize.s; 

            this.totalBufferSize += trueSize;
        });





    }

    private static RoundUp(sizeOfBuffer:number){
        return Math.ceil(sizeOfBuffer / 16) * 16;
    }
}

interface BufferDataPosition{
    bytePosition:number;
    sizeOfData:number;
}
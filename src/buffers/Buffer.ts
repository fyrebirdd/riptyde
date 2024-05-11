import WebGPU from "../../WebGPU/WebGPUState";
import { BufferDataEntry } from "./BufferBuilder";

export class Buffer{

    private dataMap: Map<string, BufferDataPosition>

    private buffer:GPUBuffer;

    private totalBufferSize:number = 0;
    private largestAlignSize:number = 0;

    constructor(entries: BufferDataEntry[], usage:GPUBufferUsageFlags){
        this.dataMap = new Map();

        entries.forEach((entry) => {
            let alignmentSize = entry.typeData;

            let trueSize = alignmentSize.size < alignmentSize.align ? alignmentSize.align : alignmentSize.size; 

            let dataPosition:BufferDataPosition = {
                bytePosition: this.totalBufferSize,
                sizeOfData: trueSize
            };

            if (alignmentSize.align > this.largestAlignSize) this.largestAlignSize = alignmentSize.align;

            this.dataMap.set(entry.label, dataPosition);

            this.totalBufferSize += trueSize;
        });

        this.buffer = WebGPU.GetDevice().createBuffer({ size: Buffer.RoundUp(this.totalBufferSize), usage: usage });

        Array.from(this.dataMap.values()).forEach((entry, index) => {
            let thisEntry = entries[index];
            WebGPU.GetDevice().queue.writeBuffer(
                this.buffer,
                entry.bytePosition,
                thisEntry.data.buffer,
                thisEntry.data.byteOffset,
                thisEntry.data.byteLength
            );
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
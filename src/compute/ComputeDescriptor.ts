import { DataType } from "./DataInputTypes";

export interface ComputeDescriptor{
    inputs: {dataType:DataType, data: any}[];
    outputType: DataType;
    outputSize: number;

    workGroupCount: {x:number, y?:number, z?:number}
}
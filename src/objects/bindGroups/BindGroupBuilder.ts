import WebGPU from "../../WebGPU/WebGPUState";
import { iBaseGroupEntry } from "./bindGroupEntries/iBaseEntry";

export class BindGroupBuilder{
    
    private bindGroupEntries:any[];


    constructor(){
        this.bindGroupEntries = [];
    }

    public AddEntry(entry: iBaseGroupEntry){
        this.bindGroupEntries.push(entry)
    }

    public Build(): GPUBindGroup{
        let device = WebGPU.GetDevice();
        let groupList: GPUBindGroupEntry[] = [];
        let layoutList: GPUBindGroupLayoutEntry[] = [];

        this.bindGroupEntries.forEach((entry:iBaseGroupEntry) => {
            groupList.push(entry.groupEntry)
            layoutList.push(entry.layoutEntry);
        });
        
        let layout: GPUBindGroupLayoutDescriptor = {
            entries: layoutList
        };
        
        let groupDescriptor:GPUBindGroupDescriptor = {
            layout: device.createBindGroupLayout(layout),
            entries: groupList
        };

        let group = device.createBindGroup(groupDescriptor);

        return group;
    }

}
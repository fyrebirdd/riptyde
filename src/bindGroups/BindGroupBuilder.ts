import { BindGroup } from "./BindGroup";
import { iBaseGroupEntry } from "./bindGroupEntries/iBaseEntry";

export class BindGroupBuilder{
    
    private bindGroupEntries:any[];


    constructor(){
        this.bindGroupEntries = [];
    }

    public AddEntry(entry: iBaseGroupEntry){
        this.bindGroupEntries.push(entry)
    }

    public Build(): BindGroup{
        let groupList: GPUBindGroupEntry[] = [];
        let layoutList: GPUBindGroupLayoutEntry[] = [];

        this.bindGroupEntries.forEach((entry:iBaseGroupEntry) => {
            groupList.push(entry.groupEntry)
            layoutList.push(entry.layoutEntry);
        });
        
        let group:BindGroup = new BindGroup(layoutList, groupList);

        return group;
    }

}
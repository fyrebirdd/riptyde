import WebGPU from "../WebGPU/WebGPUState";

export class BindGroup{

    private layout:GPUBindGroupLayout;
    private bindGroup: GPUBindGroup;

    constructor(
        layoutList:GPUBindGroupLayoutEntry[],
         groupEntryList: GPUBindGroupEntry[]
    ){
        let device = WebGPU.GetDevice();
        let layout: GPUBindGroupLayoutDescriptor = {
            entries: layoutList
        };

        this.layout = device.createBindGroupLayout(layout);
        
        let descriptor = {
            layout: this.layout,
            entries: groupEntryList
        };
        
        this.bindGroup = device.createBindGroup(descriptor);
    }

    public GetBindGroup(){
        return this.bindGroup;
    }

    public GetLayout(){
        return this.layout;
    }
}
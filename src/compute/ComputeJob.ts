import { ComputeDescriptor } from "./ComputeDescriptor";
import { DataType } from "./DataInputTypes";
import { WebGPU } from "../riptyde";

export class ComputeJob{

    private buffers:{buffer:GPUBuffer, type: GPUBufferBindingType}[];

    private device:GPUDevice;
    private computePipeline: GPUComputePipeline;
    private bindGroup: GPUBindGroup;
    private bindGroupLayout: GPUBindGroupLayout;

    private workGroupCount: {x:number, y?:number, z?:number};

    private resultSize: number;

    constructor(shaderText: string, desc: ComputeDescriptor){
        this.buffers = [];
        this.device = WebGPU.getDevice() as GPUDevice;

        // Setup Inputs
        desc.inputs.forEach((input:{dataType:DataType, data: any}) =>{

            if (input.dataType == DataType.Matrix){
                const matrixInput = input.data as Float32Array;

                const newGPUBuffer = this.device.createBuffer({
                    mappedAtCreation: true,
                    size: matrixInput.byteLength,
                    usage: GPUBufferUsage.STORAGE,
                });

                const newArrayBuffer = newGPUBuffer.getMappedRange();
                new Float32Array(newArrayBuffer).set(matrixInput);
                newGPUBuffer.unmap();

                this.buffers.push({
                    buffer: newGPUBuffer,
                    type: "read-only-storage"
                });
            }
        });


        //Setup Output
        this.resultSize = desc.outputSize;
        if (desc.outputType == DataType.Matrix){

            let resultBuffer = this.device.createBuffer({
                size: this.resultSize,
                usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
            });

            this.buffers.push({
                buffer: resultBuffer,
                type: 'storage'
            });

        }

        const bindGroupLayoutEntries:GPUBindGroupLayoutEntry[] = [];
        const bindGroupEntries:GPUBindGroupEntry[] = [];
        let bindNum = 0;

        this.buffers.forEach((bufferObj: {buffer:GPUBuffer, type: GPUBufferBindingType}) =>{
            bindGroupLayoutEntries.push({
                binding: bindNum,
                visibility: GPUShaderStage.COMPUTE,
                buffer:{
                    type: bufferObj.type
                }
            });

            bindGroupEntries.push({
                binding: bindNum,
                resource: {
                    buffer: bufferObj.buffer
                }
            });
            bindNum++;
        });

        this.bindGroupLayout = this.device.createBindGroupLayout({entries: bindGroupLayoutEntries});

        this.bindGroup = this.device.createBindGroup({
            layout: this.bindGroupLayout,
            entries: bindGroupEntries
        });

        let shaderModule = this.device.createShaderModule({code: shaderText});

        this.computePipeline = this.device.createComputePipeline({
            layout: this.device.createPipelineLayout({
                bindGroupLayouts: [this.bindGroupLayout]
            }),
            compute:{
                module:shaderModule,
                entryPoint:"main"
            }
        });

        this.workGroupCount = { 
            x: Math.ceil(desc.workGroupCount.x), 
            y: desc.workGroupCount.y ? Math.ceil(desc.workGroupCount.y) : undefined, 
            z: desc.workGroupCount.z ? Math.ceil(desc.workGroupCount.z) : undefined};
    }

    public async Run(): Promise<any>{
        const device = WebGPU.getDevice()!;

        const commandEncoder = device.createCommandEncoder();

        const passEncoder = commandEncoder.beginComputePass();
        passEncoder.setPipeline(this.computePipeline);
        passEncoder.setBindGroup(0, this.bindGroup);
        passEncoder.dispatchWorkgroups(this.workGroupCount.x, this.workGroupCount.y, this.workGroupCount.z);
        passEncoder.end();

        const gpuReadBuffer = device.createBuffer({
            size: this.resultSize,
            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
        });

        commandEncoder.copyBufferToBuffer(
            this.buffers[this.buffers.length-1].buffer,
            0,
            gpuReadBuffer,
            0,
            this.resultSize
        );

        const gpuCommands = commandEncoder.finish();
        device.queue.submit([gpuCommands]);

        await gpuReadBuffer.mapAsync(GPUMapMode.READ);
        const arrayBuffer = gpuReadBuffer.getMappedRange();
        return new Float32Array(arrayBuffer);
    }
}
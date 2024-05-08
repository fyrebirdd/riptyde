import WebGPU from "../WebGPU/WebGPUState";
import { BaseMaterial } from "./BaseMaterial";
import { BaseMesh } from "./BaseMesh";
import { BaseObject } from "./BaseObject"

class RenderableObject extends BaseObject{

    private mesh:BaseMesh;
    private material:BaseMaterial;

    private primitiveState:GPUPrimitiveState;
    private depthStencilState:GPUDepthStencilState;
    private vertexState:GPUVertexState;
    private fragmentState:GPUFragmentState;

    private renderPipeline?:GPURenderPipeline;
    private renderPipelineLayout:GPUPipelineLayoutDescriptor;


    constructor(
        mesh:BaseMesh, 
        material:BaseMaterial, 
        primitiveState:GPUPrimitiveState = {
            topology: 'triangle-list', 
            cullMode: 'back'
        },
        depthStencilState:GPUDepthStencilState = {
            depthWriteEnabled:true,
            depthCompare:'less',
            format:'depth24plus'
        },
        renderPipelineLayout:GPUPipelineLayoutDescriptor = {
            bindGroupLayouts: material._getBindGroupLayouts()
        },
        vertexState:GPUVertexState = {
            module: material._getShaderModule(), 
            entryPoint: material._getVertexEntryFunctionName(),
            buffers: [mesh._getVertexBufferLayout()]
        },
        fragmentState:GPUFragmentState = {
            module: material._getShaderModule(),
            entryPoint: material._getFragmentEntryFunctionName(),
            targets:[
                {
                    format:navigator.gpu.getPreferredCanvasFormat()
                }
            ]
        }
    ){
        super();

        this.mesh = mesh;
        this.material = material;

        this.primitiveState = primitiveState;
        this.depthStencilState = depthStencilState;
        this.vertexState = vertexState;
        this.fragmentState = fragmentState;

        this.renderPipelineLayout = renderPipelineLayout;
        this.CreateRenderPipeline();
    }

    private CreateRenderPipeline(){
        let gpuDevice = WebGPU.GetDevice();
        this.renderPipeline = gpuDevice.createRenderPipeline({
            layout: gpuDevice.createPipelineLayout(this.renderPipelineLayout),
            vertex:this.vertexState,
            fragment:this.fragmentState,
            primitive: this.primitiveState,
            depthStencil: this.depthStencilState
        });
    }

    public GetRenderPipeline(){
        return this.renderPipeline;
    }

    public GetMesh(){
        return this.mesh;
    }

    public GetMaterial(){
        return this.material;
    }

}

export {RenderableObject}
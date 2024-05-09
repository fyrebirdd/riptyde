import WebGPU from "../WebGPU/WebGPUState";
import { BaseMaterial } from "./materials/BaseMaterial";
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


    constructor(mesh:BaseMesh, material:BaseMaterial){
        super();

        this.mesh = mesh;
        this.material = material;

        
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
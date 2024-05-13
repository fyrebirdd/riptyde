import { BindGroup } from "../bindGroups/BindGroup";
import { Vertex } from "../loaders/OBJ_Loader";
import { Shader } from "./Shader";

export class Material{

    private shader:Shader;
    private bindGroups?: BindGroup[];

    private vertexBufferLayout?: GPUVertexBufferLayout;

    private renderPipeline?: GPURenderPipeline;
    private renderPipelineDescriptor?: GPURenderPipelineDescriptor;



    constructor(s:Shader, bindGroups?:BindGroup[]){
        this.shader = s;
        this.bindGroups = bindGroups;

        let bindGroupLayouts = [];
        
        if (bindGroups){
            bindGroups.forEach((bindGroup) => {
                bindGroupLayouts.push(bindGroup.GetLayout);
            });
        }
    }

    public _setVertexBufferLayout(vertexBufferLayout:GPUVertexBufferLayout){

    }

    public _createRenderPipeline(canvasWidth:number, canvasHeight:number){
        
    }
}
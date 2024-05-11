import { Vertex } from "../loaders/LoadersMain";
import WebGPU from "../WebGPU/WebGPUState";

class BaseMesh {

    private label:string;

    private vertexArray: Vertex[];
    private mappedVertexArray: number[];

    private vertexStrideBytes: number;

    private vertexBuffer?: GPUBuffer;
    private vertexBufferLayout?: GPUVertexBufferLayout;

    constructor(label:string, vertexArray:Vertex[]){
        this.label = label;
        this.vertexArray = vertexArray;
        this.vertexStrideBytes = vertexArray[0].GetStrideInBytes();
        this.mappedVertexArray = this.vertexArray.flatMap(vertex => vertex.GetAsArray());

        this.CreateVertexBuffer();
        this.CreateVertexBufferLayout();
    }

    private CreateVertexBuffer(){
        this.vertexBuffer = WebGPU.GetDevice().createBuffer({
            size: this.mappedVertexArray.length * Float32Array.BYTES_PER_ELEMENT,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            mappedAtCreation: true,
        });

        new Float32Array(this.vertexBuffer.getMappedRange()).set(this.mappedVertexArray);
        this.vertexBuffer.unmap();
    }

    private CreateVertexBufferLayout() {
        let strideMap = new Map<number, GPUVertexAttribute[]>();

        strideMap.set(3 * Float32Array.BYTES_PER_ELEMENT, // positions
            [
                { shaderLocation: 0, offset: 0, format: 'float32x3' }
            ]
        );
        strideMap.set((3 + 3) * Float32Array.BYTES_PER_ELEMENT, // position and normals
            [
                { shaderLocation: 0, offset: 0, format: 'float32x3' },
                { shaderLocation: 1, offset: 12, format: 'float32x3' }
            ]
        );
        strideMap.set((3 + 2) * Float32Array.BYTES_PER_ELEMENT, // position and uvs
            [
                { shaderLocation: 0, offset: 0, format: 'float32x3' },
                { shaderLocation: 1, offset: 12, format: 'float32x2' }
            ]
        );
        strideMap.set((3 + 3 + 2) * Float32Array.BYTES_PER_ELEMENT, // positions, normals, and uvs
            [
                { shaderLocation: 0, offset: 0, format: 'float32x3' },
                { shaderLocation: 1, offset: 12, format: 'float32x3' },
                { shaderLocation: 2, offset: 24, format: 'float32x2' }
            ]
        );
    
        const attributes = strideMap.get(this.vertexStrideBytes);
        if (attributes) {
            this.vertexBufferLayout = {
                arrayStride: this.vertexStrideBytes,
                attributes
            };
        } 
        else {
            console.error('Unrecognized vertex stride bytes:', this.vertexStrideBytes);
        }
    }

    public _getVertexBuffer(){
        return this.vertexBuffer!;
    }

    public _getVertexBufferLayout(){
        return this.vertexBufferLayout!;
    }
}

export {BaseMesh}
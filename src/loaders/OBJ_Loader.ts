import { Vec2, vec2, Vec3, vec3 } from "wgpu-matrix";
import { Vertex } from "./LoadersMain";

export class OBJ_Loader
{
    private constructor(){}

    static async Load(objString:string){
        const positions: Vec3[] = [];
        const normals: Vec3[] = [];
        const uvs: Vec2[] = [];
        const vertices: Vertex[] = [];

        var numNormals = 0;
        var numUvs = 0;
        var numVertex = 0;

        for (const line of objString.split("\n")) {
            if (line.startsWith("v ")){
                positions.push(this.parseVec3(line));
            }
            else if (line.startsWith("vn ")){
                normals.push(this.parseVec3(line));
                numNormals++;
            }
            else if (line.startsWith("vt ")){
                uvs.push(this.parseVec2(line));
                numUvs++;
            }
            else if (line.startsWith("f ")){
                vertices.push(...this.createVertexFromIndex(line,positions,normals,uvs));
                numVertex++;
            }
        }
        return vertices;
    }

    private static parseVec3(line:string): Vec3{
        const parts = line.split(" ");
        return vec3.create(Number(parts[1]), Number(parts[2]), Number(parts[3]));
    }
    private static parseVec2(line:string): Vec2{
        const parts = line.split(" ");
        return vec2.create(Number(parts[1]), Number(parts[2]));
    }
    private static createVertexFromIndex(line:string, positions: Vec3[], normals: Vec3[], uvs: Vec2[]): Vertex[]{
        return line.split(" ").splice(1).flatMap((vertex: string)=>{
            let vSplit = vertex.split("/");
            return new Vertex(positions[Number(vSplit[0]) - 1], uvs[Number(vSplit[1]) -1 ],normals[Number(vSplit[2]) - 1]);
        });
    }
}       

export { Vertex };

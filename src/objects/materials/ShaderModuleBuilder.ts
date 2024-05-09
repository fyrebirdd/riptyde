import { Shader } from "./Shader";

export class ShaderModuleBuilder{

    private code: string;
    private cHints: GPUShaderModuleCompilationHint[];
    private sMap?: object;

    constructor(){
        this.code = "";
        this.cHints = [];
        this.sMap = undefined;
    }

    public SetCode(code:string){
        this.code = code;
    }

    public SetCompilationHints(){
        this.cHints = this.cHints
    }

    public SetSourceMap(sMap:object){
        this.sMap = sMap;
    }


    public Build():Shader{
        var newShader = new Shader(this.code, this.cHints, this.sMap)
        return newShader;
    }
}
export class WebGPU_State{

    private static instance: WebGPU_State;

    private adapter?:GPUAdapter;
    private device?:GPUDevice;
    private context?:GPUCanvasContext;

    private initialized:boolean;

    private constructor(){
        this.initialized = false;
    }

    public static getInstance(){
        if (!WebGPU_State.instance){
            WebGPU_State.instance = new WebGPU_State();
        }
        return WebGPU_State.instance;
    };

    private async InitializeWebGPU(){        
        this.adapter = await navigator.gpu.requestAdapter() as GPUAdapter;
        this.device = await this.adapter.requestDevice() as GPUDevice;

        this.device.lost.then((info) => {
            console.error(`WebGPU device was lost: ${info.message}`);
            this.device = undefined;
            if (info.reason != 'destroyed'){
                this.InitializeWebGPU();
            }
        });        
    };

    public async Init(
        canvas:HTMLCanvasElement,  
        alphaMode:GPUCanvasAlphaMode = 'premultiplied'
    ){
        if (!('gpu' in navigator)){
            return false;
        };

        await this.InitializeWebGPU();

        this.context = canvas.getContext('webgpu') as GPUCanvasContext;
        this.context.configure({
            device: this.device!,
            format: navigator.gpu.getPreferredCanvasFormat(),
            alphaMode: alphaMode
        });

        this.initialized = true;
        return true;
    }

    public isInitialized(){
        return this.initialized;
    };

    private CheckInitializedThrowError(){
        if (!this.initialized){
            throw new Error("Initialize WebGPU before calling other methods (WebGPU.Init(canvas))");
        }
    }

    public GetDevice(){
        this.CheckInitializedThrowError();
        return this.device!;
    };

    public GetContext(){
        this.CheckInitializedThrowError();
        return this.context!;
    }
}

const WebGPU = WebGPU_State.getInstance();
export default WebGPU;
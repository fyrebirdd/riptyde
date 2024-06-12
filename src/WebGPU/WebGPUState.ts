export class WebGPU_State{

    private static instance: WebGPU_State;
    
    private device?:GPUDevice;

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

    public getDevice(){
        if (this.initialized == false){
            return;
        }
        return this.device;
    }

    public isInitialized(){
        return this.initialized;
    }

    public async Init(){
        if (!('gpu' in navigator)){
            console.log("GPU not found, please use a browser that supports WebGPU!")
        }
        let adapter = await navigator.gpu.requestAdapter();
        if (adapter == undefined){
            console.log("Unable to get adapter, try restarting your browser!");
            return false;
        }
        this.device = await adapter.requestDevice();
        this.device.lost.then((info) => {
            console.error(`WebGPU device was lost: ${info.message}`);
            this.device = undefined;
            if (info.reason != 'destroyed'){
                this.Init();
            }
        });   
        this.initialized = true;
            console.log("WebGPU Initialized!")
        return true;
    }
}

const WebGPU = WebGPU_State.getInstance();
export default WebGPU;
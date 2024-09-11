export class WebGPU_State{
    
    private device?:GPUDevice;

    private initialized:boolean;

    private constructor(){
        this.initialized = false;
    }

    public static _getInitialWebGPUStateObject(): WebGPU_State{
        return new WebGPU_State();
    }

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
        // Checking if WebGPU is available on the current browser
        if (!('gpu' in navigator)){
            console.log("GPU not found, please use a browser that supports WebGPU!")
            return false;
        }
        // Getting Adapter
        let adapter = await navigator.gpu.requestAdapter();
        if (adapter == undefined){
            console.log("Unable to get adapter, try restarting your browser!");
            return false;
        }
        // Getting Device
        this.device = await adapter.requestDevice();
        // Setting device recovery steps upon loss
        this.device.lost.then((info) => {
            console.error(`WebGPU device was lost: ${info.message}`);
            this.device = undefined;
            // If the device was not destroyed (happens when closing tab), then reinitalize it.
            if (info.reason != 'destroyed'){
                this.Init();
            }
        });   
        this.initialized = true;
            console.log("WebGPU Initialized!")
        return true;
    }
}

const WebGPU = WebGPU_State._getInitialWebGPUStateObject();
export default WebGPU;
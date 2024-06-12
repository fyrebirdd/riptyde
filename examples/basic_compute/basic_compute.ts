import * as riptyde from "../../dist/riptyde";
/***
 * Implements the Compute Shader example made by François Beaufort that can be found here:
 * https://developer.chrome.com/docs/capabilities/web-apis/gpu-compute
 * 
 * Multiplies 2 matrices together, and prints the result
 */

export default async function MatrixAdditionExample(){
    const example_basic_compute_shader:string = `
        struct Matrix {
            size: vec2f,
            numbers: array<f32>,
        }

        @group(0) @binding(0) var<storage, read> firstMatrix: Matrix;
        @group(0) @binding(1) var<storage, read> secondMatrix: Matrix;
        @group(0) @binding(2) var<storage, read_write> resultMatrix: Matrix;

        @compute @workgroup_size(8,8)
        fn main(@builtin(global_invocation_id) global_id : vec3u) {
            // Guard against out-of-bounds work group sizes
            if (global_id.x >= u32(firstMatrix.size.x) || global_id.y >= u32(secondMatrix.size.y)) {
                return;
            }

            resultMatrix.size = vec2(firstMatrix.size.x, secondMatrix.size.y);

            let resultCell = vec2(global_id.x, global_id.y);
            var result = 0.0;
            for (var i = 0u; i < u32(firstMatrix.size.y); i = i + 1u) {
                let a = i + resultCell.x * u32(firstMatrix.size.y);
                let b = resultCell.y + i * u32(secondMatrix.size.y);
                result = result + firstMatrix.numbers[a] * secondMatrix.numbers[b];
            }

            let index = resultCell.y + resultCell.x * u32(secondMatrix.size.y);
            resultMatrix.numbers[index] = result;
        }
    `;

    const firstMatrix = new Float32Array([
        2 /*rows*/,
        4 /*columns*/,
        1, 2, 3, 4,
        5, 6, 7, 8
    ]);

    const secondMatrix = new Float32Array([
        4 /*rows*/,
        2 /*columns*/,
        1, 2, 
        3, 4,
        5, 6, 
        7, 8
    ]);

    let computeDesc:riptyde.ComputeDescriptor = {
        inputs: [
            {
                dataType: riptyde.DataType.Matrix,
                data: firstMatrix
            },
            {
                dataType: riptyde.DataType.Matrix,
                data: secondMatrix
            }
        ],

        outputType: riptyde.DataType.Matrix,
        outputSize: Float32Array.BYTES_PER_ELEMENT * (2 + firstMatrix[0] * secondMatrix[1]),

        workGroupCount: {
            x: firstMatrix[0]/ 8,
            y: secondMatrix[1] / 8,
            z: undefined
        }
    };

    let result = await new riptyde.ComputeJob(example_basic_compute_shader, computeDesc).Run();

    console.log(`
        ${firstMatrix[2]} ${firstMatrix[3]} ${firstMatrix[4]} ${firstMatrix[5]}
        ${firstMatrix[6]} ${firstMatrix[7]} ${firstMatrix[8]} ${firstMatrix[9]}

        x

        ${secondMatrix[2]} ${secondMatrix[3]}
        ${secondMatrix[4]} ${secondMatrix[5]}
        ${secondMatrix[6]} ${secondMatrix[7]}
        ${secondMatrix[8]} ${secondMatrix[9]}

        =

        ${result[2]} ${result[3]}
        ${result[4]} ${result[5]}
    `);
}
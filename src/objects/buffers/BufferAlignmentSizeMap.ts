export enum BufferEntryType{
    i32,
    u32,
    f32,

    vec2,
    vec3,
    vec4,
    
    mat2,
    mat2x3,
    mat2x4,

    mat3,
    mat3x2,
    mat3x4,

    mat4,
    mat4x2,
    mat4x3,
}
interface BufferAlignmentSizeMapEntry{
    a:number,
    s:number
}

const BufferDataTypeMap = new Map<BufferEntryType, BufferAlignmentSizeMapEntry>()
    .set(BufferEntryType.i32, {s:4,a:4})
    .set(BufferEntryType.u32, {s:4,a:4})
    .set(BufferEntryType.f32, {s:4,a:4})
    .set(BufferEntryType.vec2, {s:8,a:8})
    .set(BufferEntryType.vec3, {s:12,a:16})
    .set(BufferEntryType.vec4, {s:16,a:16})
    .set(BufferEntryType.mat2, {s:16,a:8})
    .set(BufferEntryType.mat2x3, {s:32,a:16})
    .set(BufferEntryType.mat2x4, {s:32,a:16})
    .set(BufferEntryType.mat3, {s:48,a:16})
    .set(BufferEntryType.mat3x2, {s:24,a:8})
    .set(BufferEntryType.mat3x4, {s:48,a:16})
    .set(BufferEntryType.mat4, {s:64,a:16})
    .set(BufferEntryType.mat4x2, {s:32,a:8})
    .set(BufferEntryType.mat4x3, {s:64,a:16});

export default BufferDataTypeMap;
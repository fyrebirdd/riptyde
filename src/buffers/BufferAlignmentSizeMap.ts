export interface BufferDataTypeInfo{
    align: number;
    size: number;
}

export type BufferDataTypes =
    "f32" | 
    "i32" | 
    "u32" |

    "atomic" |

    "vec2f" |
    "vec2u" | 
    "vec2i" |

    "vec3f" |
    "vec3u" | 
    "vec3i" |

    "vec4f" |
    "vec4u" | 
    "vec4i" |

    "mat2x2f" | 
    "mat3x2f" |
    "mat4x2f" |
    "mat2x3f" |
    "mat3x3f" |
    "mat4x3f" |
    "mat2x4f" |
    "mat3x4f" |
    "mat4x4f";

const DataTypesRecord: Record<BufferDataTypes, BufferDataTypeInfo> = {
    "f32": { align: 4, size: 4 },
    "i32": { align: 4, size: 4 },
    "u32": { align: 4, size: 4 },

    "atomic": { align: 4, size: 4 },

    "vec2f": { align: 8, size: 8 },
    "vec2u": { align: 8, size: 8 },
    "vec2i": { align: 8, size: 8 },

    "vec3f": { align: 16, size: 12 },
    "vec3u": { align: 16, size: 12 },
    "vec3i": { align: 16, size: 12 },

    "vec4f": { align: 16, size: 16 },
    "vec4u": { align: 16, size: 16 },
    "vec4i": { align: 16, size: 16 },

    "mat2x2f": { align: 8, size: 16 },
    "mat3x2f": { align: 8, size: 24 },
    "mat4x2f": { align: 8, size: 32 },
    "mat2x3f": { align: 16, size: 32 },
    "mat3x3f": { align: 16, size: 48 },
    "mat4x3f": { align: 16, size: 64 },
    "mat2x4f": { align: 16, size: 32 },
    "mat3x4f": { align: 16, size: 48 },
    "mat4x4f": { align: 16, size: 64 },
};

export function GetBufferDataType(type: BufferDataTypes): BufferDataTypeInfo {
    return DataTypesRecord[type];
}
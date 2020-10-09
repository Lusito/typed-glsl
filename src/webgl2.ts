import { factoriesGl1 } from "./webgl1";

export const factoriesGl2 = {
    ...factoriesGl1,

    uniform1ui: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLuint) => gl.uniform1ui(location, x),
        setV: (v: Uint32List, srcOffset?: GLuint, srcLength?: GLuint) =>
            gl.uniform1uiv(location, v, srcOffset, srcLength),
    }),
    uniform2ui: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLuint, y: GLuint) => gl.uniform2ui(location, x, y),
        setV: (v: Uint32List, srcOffset?: GLuint, srcLength?: GLuint) =>
            gl.uniform2uiv(location, v, srcOffset, srcLength),
    }),
    uniform3ui: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLuint, y: GLuint, z: GLuint) => gl.uniform3ui(location, x, y, z),
        setV: (v: Uint32List, srcOffset?: GLuint, srcLength?: GLuint) =>
            gl.uniform3uiv(location, v, srcOffset, srcLength),
    }),
    uniform4ui: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLuint, y: GLuint, z: GLuint, w: GLuint) => gl.uniform4ui(location, x, y, z, w),
        setV: (v: Uint32List, srcOffset?: GLuint, srcLength?: GLuint) =>
            gl.uniform4uiv(location, v, srcOffset, srcLength),
    }),
    uniformMatrix2x3f: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint) =>
            gl.uniformMatrix2x3fv(location, transpose, data, srcOffset, srcLength),
    }),
    uniformMatrix2x4f: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint) =>
            gl.uniformMatrix2x4fv(location, transpose, data, srcOffset, srcLength),
    }),
    uniformMatrix3x2f: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint) =>
            gl.uniformMatrix3x2fv(location, transpose, data, srcOffset, srcLength),
    }),
    uniformMatrix3x4f: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint) =>
            gl.uniformMatrix3x4fv(location, transpose, data, srcOffset, srcLength),
    }),
    uniformMatrix4x2f: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint) =>
            gl.uniformMatrix4x2fv(location, transpose, data, srcOffset, srcLength),
    }),
    uniformMatrix4x3f: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint) =>
            gl.uniformMatrix4x3fv(location, transpose, data, srcOffset, srcLength),
    }),
    vertexAttribDivisor: (gl: WebGL2RenderingContext, location: GLuint) => ({
        location,
        set: (divisor: GLuint) => gl.vertexAttribDivisor(location, divisor),
    }),
    vertexAttribI4i: (gl: WebGL2RenderingContext, location: GLuint) => ({
        location,
        set: (x: GLint, y: GLint, z: GLint, w: GLint) => gl.vertexAttribI4i(location, x, y, z, w),
        setV: (v: Int32List) => gl.vertexAttribI4iv(location, v),
    }),
    vertexAttribI4ui: (gl: WebGL2RenderingContext, location: GLuint) => ({
        location,
        set: (x: GLuint, y: GLuint, z: GLuint, w: GLuint) => gl.vertexAttribI4ui(location, x, y, z, w),
        setV: (v: Uint32List) => gl.vertexAttribI4uiv(location, v),
    }),
    vertexAttribIPointer: (gl: WebGL2RenderingContext, location: GLuint) => ({
        location,
        enable: () => gl.enableVertexAttribArray(location),
        disable: () => gl.disableVertexAttribArray(location),
        set: (size: GLint, type: GLenum, stride: GLsizei, offset: GLintptr) =>
            gl.vertexAttribIPointer(location, size, type, stride, offset),
    }),
};

export type AllowedTypesGl2 = typeof factoriesGl2;

export type DataMapGl2 = { [s: string]: keyof AllowedTypesGl2 };

export type AllowedTypesGl1 = typeof factoriesGl1;

export type DataMapGl1 = { [s: string]: keyof AllowedTypesGl1 };

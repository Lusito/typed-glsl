export const factoriesGl1 = {
    uniform1f: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLfloat) => gl.uniform1f(location, x),
        setV: (v: Float32List) => gl.uniform1fv(location, v),
    }),
    uniform2f: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLfloat, y: GLfloat) => gl.uniform2f(location, x, y),
        setV: (v: Float32List) => gl.uniform2fv(location, v),
    }),
    uniform3f: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLfloat, y: GLfloat, z: GLfloat) => gl.uniform3f(location, x, y, z),
        setV: (v: Float32List) => gl.uniform3fv(location, v),
    }),
    uniform4f: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat) => gl.uniform4f(location, x, y, z, w),
        setV: (v: Float32List) => gl.uniform4fv(location, v),
    }),
    uniform1i: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLint) => gl.uniform1i(location, x),
        setV: (v: Int32List) => gl.uniform1iv(location, v),
    }),
    uniform2i: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLint, y: GLint) => gl.uniform2i(location, x, y),
        setV: (v: Int32List) => gl.uniform2iv(location, v),
    }),
    uniform3i: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLint, y: GLint, z: GLint) => gl.uniform3i(location, x, y, z),
        setV: (v: Int32List) => gl.uniform3iv(location, v),
    }),
    uniform4i: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (x: GLint, y: GLint, z: GLint, w: GLint) => gl.uniform4i(location, x, y, z, w),
        setV: (v: Int32List) => gl.uniform4iv(location, v),
    }),
    uniformMatrix2f: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (transpose: GLboolean, v: Float32List) => gl.uniformMatrix2fv(location, transpose, v),
    }),
    uniformMatrix3f: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (transpose: GLboolean, v: Float32List) => gl.uniformMatrix3fv(location, transpose, v),
    }),
    uniformMatrix4f: (gl: WebGLRenderingContext, location: WebGLUniformLocation | null) => ({
        location,
        set: (transpose: GLboolean, v: Float32List) => gl.uniformMatrix4fv(location, transpose, v),
    }),
    vertexAttrib1f: (gl: WebGLRenderingContext, location: GLuint) => ({
        location,
        set: (x: GLfloat) => gl.vertexAttrib1f(location, x),
        setV: (v: Float32List) => gl.vertexAttrib1fv(location, v),
    }),
    vertexAttrib2f: (gl: WebGLRenderingContext, location: GLuint) => ({
        location,
        set: (x: GLfloat, y: GLfloat) => gl.vertexAttrib2f(location, x, y),
        setV: (v: Float32List) => gl.vertexAttrib2fv(location, v),
    }),
    vertexAttrib3f: (gl: WebGLRenderingContext, location: GLuint) => ({
        location,
        set: (x: GLfloat, y: GLfloat, z: GLfloat) => gl.vertexAttrib3f(location, x, y, z),
        setV: (v: Float32List) => gl.vertexAttrib3fv(location, v),
    }),
    vertexAttrib4f: (gl: WebGLRenderingContext, location: GLuint) => ({
        location,
        set: (x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat) => gl.vertexAttrib4f(location, x, y, z, w),
        setV: (v: Float32List) => gl.vertexAttrib4fv(location, v),
    }),
    vertexAttribPointer: (gl: WebGLRenderingContext, location: GLuint) => ({
        location,
        enable: () => gl.enableVertexAttribArray(location),
        disable: () => gl.disableVertexAttribArray(location),
        set: (size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr) =>
            gl.vertexAttribPointer(location, size, type, normalized, stride, offset),
    }),
};

export type AllowedTypesGl1 = typeof factoriesGl1;

export type DataMapGl1 = { [s: string]: keyof AllowedTypesGl1 };

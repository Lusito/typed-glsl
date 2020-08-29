const factories = {
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

type AllowedTypes = typeof factories;

type DataMap = { [s: string]: keyof AllowedTypes };

type AttribSetters<T extends DataMap> = {
    [TKey in keyof T]: ReturnType<AllowedTypes[T[TKey]]>;
};

function addShader(gl: WebGLRenderingContext, program: WebGLProgram, type: number, source: string) {
    const shader = gl.createShader(type) as WebGLShader;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    return shader;
}

export type ShaderProgram<T extends DataMap> = AttribSetters<T> & { use: () => void; dispose: () => void };

export function createShaderProgram<T extends DataMap>(
    gl: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string,
    data: T
): ShaderProgram<T> {
    const program = gl.createProgram() as WebGLProgram;
    const setters: any = {};
    const vertexShader = addShader(gl, program, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = addShader(gl, program, gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.linkProgram(program);
    gl.useProgram(program);

    for (const key of Object.keys(data)) {
        const fn = data[key];
        const factory = factories[fn];
        if (!factory) throw new Error(`Can't handle ${fn}!`);
        const location = fn.startsWith("uniform")
            ? gl.getUniformLocation(program, key)
            : gl.getAttribLocation(program, key);
        setters[key] = factory(gl, location as any);
    }

    return {
        ...setters,
        use() {
            gl.useProgram(program);
        },
        dispose() {
            gl.useProgram(null);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            gl.deleteProgram(program);
        },
    };
}

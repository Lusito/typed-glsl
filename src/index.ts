import { DataMapGl1 } from "./webgl1";
import { AllowedTypesGl2, DataMapGl2, factoriesGl2 } from "./webgl2";

export function glsl(literals: TemplateStringsArray, ...placeholders: string[]) {
    let result = "";
    for (let i = 0; i < placeholders.length; i++) {
        result += literals[i];
        result += placeholders[i];
    }
    return result.replace(/^[\r\n]+/, "") + literals[literals.length - 1];
}

function addShader(gl: WebGLRenderingContext, program: WebGLProgram, type: number, source: string) {
    const shader = gl.createShader(type) as WebGLShader;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const compilationLog = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);

        throw new Error(`Failed compiling shader: ${compilationLog ?? "unknown error"}`);
    }

    gl.attachShader(program, shader);
    return shader;
}

export type AttribSetters<T extends DataMapGl2> = {
    [TKey in keyof T]: ReturnType<AllowedTypesGl2[T[TKey]]>;
};

export type ShaderProgram<T extends DataMapGl1> = AttribSetters<T> & { use: () => void; dispose: () => void };

export type DataMap<T extends WebGLRenderingContext> = T extends WebGL2RenderingContext ? DataMapGl2 : DataMapGl1;

export function createShaderProgram<TC extends WebGLRenderingContext, TD extends DataMap<TC>>(
    gl: TC,
    vertexShaderSource: string,
    fragmentShaderSource: string,
    data: TD
): ShaderProgram<TD> {
    const program = gl.createProgram() as WebGLProgram;
    let vertexShader: WebGLShader;
    let fragmentShader: WebGLShader;

    try {
        vertexShader = addShader(gl, program, gl.VERTEX_SHADER, vertexShaderSource);
        fragmentShader = addShader(gl, program, gl.FRAGMENT_SHADER, fragmentShaderSource);
    } catch (e) {
        gl.deleteProgram(program);
        throw e;
    }

    gl.linkProgram(program);
    gl.useProgram(program);

    const setters: any = {};
    for (const key of Object.keys(data)) {
        const fn = data[key];
        const factory = factoriesGl2[fn];
        if (!factory) throw new Error(`Can't handle ${fn}!`);
        const location = fn.startsWith("uniform")
            ? gl.getUniformLocation(program, key)
            : gl.getAttribLocation(program, key);
        setters[key] = factory(gl as unknown as WebGL2RenderingContext, location as any);
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

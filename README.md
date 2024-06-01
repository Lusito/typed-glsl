[![Minified + gzipped size](https://badgen.net/bundlephobia/minzip/typed-glsl)](https://www.npmjs.com/package/typed-glsl)
[![NPM version](https://badgen.net/npm/v/typed-glsl)](https://www.npmjs.com/package/typed-glsl)
[![License](https://badgen.net/github/license/lusito/typed-glsl)](https://github.com/lusito/typed-glsl/blob/master/LICENSE)
[![Stars](https://badgen.net/github/stars/lusito/typed-glsl)](https://github.com/lusito/typed-glsl)
[![Watchers](https://badgen.net/github/watchers/lusito/typed-glsl)](https://github.com/lusito/typed-glsl)

A type-safe way to create WebGL 1/2 shader programs and set their attributes

#### Fair Warning

The code has been compiled to es2015 modules, so if you want to support older browser, you'll have to ensure that this module is being transpiled to an older es version during your build-process.

Also, this is currently an early version. Since I'm no OpenGL pro, there might be stuff missing or misunderstood.

### Why typed-glsl?

- Typesafe access to uniform and vertex attributes for WebGL 1/2
- No dependencies
- Liberal license: [zlib/libpng](https://github.com/Lusito/typed-glsl/blob/master/LICENSE)

### Installation via NPM

`npm install typed-glsl --save`

### Sample usage

First, create a file for your shader:

```typescript
import { createShaderProgram, glsl } from "typed-glsl";

const vertexShaderSource = glsl`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUV;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main() {
    vUV = uv;
    gl_Position = uPMatrix * uMVMatrix * vec4(position, 500.0, 1.0);
}
`;

const fragmentShaderSource = glsl`
precision highp float;
varying vec2 vUV;
uniform float opacity;
uniform sampler2D textureID;
uniform vec2 uvOffset;

void main() {
    gl_FragColor = texture2D(textureID, vUV + uvOffset);
    gl_FragColor.w *= opacity;
}
`;

export function createDefaultShader(gl: WebGLRenderingContext) {
  return createShaderProgram(gl, vertexShaderSource, fragmentShaderSource, {
    // Specify which attributes are in your shader and what functions you want to use to set them
    position: "vertexAttribPointer",
    uv: "vertexAttribPointer",
    uMVMatrix: "uniformMatrix4f",
    uPMatrix: "uniformMatrix4f",
    textureID: "uniform1i",
    opacity: "uniform1f",
    uvOffset: "uniform2f",
  });
}

export type DefaultShader = ReturnType<typeof createDefaultShader>;
```

Now, create a shader, use it and set its attributes:

```typescript
import { createDefaultShader } from "./shaders/defaultShader";

// At initialization
const defaultShader = createDefaultShader(gl);

// When drawing
defaultShader.use();
defaultShader.uMVMatrix.set(false, g_camera.modelView);
defaultShader.uPMatrix.set(false, g_camera.projection);
defaultShader.position.enable();
defaultShader.position.set(2, this.gl.FLOAT, false, 0, 0);
defaultShader.opacity.set(1);
```

### Report issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/typed-glsl/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

### Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

### License

typed-glsl has been released under the [zlib/libpng](https://github.com/Lusito/typed-glsl/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.

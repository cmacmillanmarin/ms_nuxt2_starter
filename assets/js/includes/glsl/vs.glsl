attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat4 pMatrix;
uniform mat4 mvMatrix;
varying vec2 vUv;
varying vec2 vUv2;
varying vec3 vNormal;
void main() {
    gl_Position =  pMatrix * mvMatrix * vec4(position, 1.0);
    vUv2 = uv;
    vNormal = normal;
    vUv = uv;
}

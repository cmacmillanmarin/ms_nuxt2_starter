#pragma glslify: snoise = require(glsl-noise/simplex/3d);

attribute vec3 position;
attribute vec2 uv;

uniform mat4 pMatrix;
uniform mat4 mvMatrix;
uniform float time;
uniform float progress;

varying vec2 vUv;
varying float noise;

void main() {
    
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 3.5;
    float noiseAmp = 0.15; 
    vec3 noisePos = vec3(pos.x * noiseFreq + time, pos.y, pos.z);
    pos.z += snoise(noisePos) * noiseAmp * progress;
    noise = pos.z;

    gl_Position = pMatrix * mvMatrix * vec4(pos, 1.0);
}

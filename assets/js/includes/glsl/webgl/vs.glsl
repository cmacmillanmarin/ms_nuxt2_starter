#pragma glslify: snoise = require(glsl-noise/simplex/3d);

attribute vec3 position;
attribute vec2 uvs;

uniform mat4 pMatrix;
uniform mat4 mvMatrix;
uniform float time;
uniform float waves;

varying vec2 uv;
varying float noise;

void main() {
    
    uv = uvs;

    vec3 pos = position;
    float noiseFreq = 3.5;
    float noiseAmp = 0.15; 
    vec3 noisePos = vec3(pos.x * noiseFreq + time, pos.y, pos.z);
    pos.z += snoise(noisePos) * noiseAmp * waves;
    noise = pos.z;

    gl_Position = pMatrix * mvMatrix * vec4(pos, 1.0);
}

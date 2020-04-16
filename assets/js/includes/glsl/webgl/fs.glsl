precision highp float;

varying vec2 uv;
varying float noise;
uniform sampler2D imgA;
uniform sampler2D imgB;
uniform float slider;

float inverse(float x) {
    return 1.0 - x;
}

#define M_PI 3.1415926535897932384626433832795

void main() {

    vec2 uvA = uv - inverse(slider) * 0.5;
    vec2 uvB = uv - slider * 0.5;
    
    vec4 imgPixelA = texture2D(imgA, uvA + noise * 0.1);
    vec4 imgPixelB = texture2D(imgB, uvB + noise * 0.1);
    
    float gapAmplitude = 0.1;
    float gapProgress = sin(M_PI * slider);
    float gap = gapAmplitude * gapProgress;
    float step = smoothstep(slider - gap, slider + gap, (uv.x + uv.y) * 0.5);

    vec4 RGBA = mix(imgPixelA, imgPixelB, step);

    gl_FragColor = RGBA;
}

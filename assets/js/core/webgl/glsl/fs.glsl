precision highp float;

varying vec2 vUv;

uniform float debug;
uniform float imgT;
uniform float imgO;
uniform sampler2D imgA;
uniform sampler2D imgB;

vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

float border(vec2 vUv) {
    float l = step(0.005, vUv.x);
    float t = step(0.004, 1.0 - vUv.y);
    float r = step(0.005, 1.0 - vUv.x);
    float b = step(0.004, vUv.y);
    return l * t * r * b;
}

void main() {

    vec4 imgAPixel = texture2D(imgA, vUv);
    vec4 imgBPixel = texture2D(imgB, vUv);

    imgAPixel.rgb *= imgAPixel.a;
    imgBPixel.rgb *= imgBPixel.a;

    vec4 pixel = mix(imgAPixel, imgBPixel, imgT);

    if (debug == 1.0) {
       // pixel = mix(black, pixel, border(vUv));
    }

    gl_FragColor = pixel;
    // gl_FragColor = mix(transparent, pixel, imgO);
}

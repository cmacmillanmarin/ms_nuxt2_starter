precision highp float;

varying vec2 vUv;
uniform sampler2D img;

void main() {

    vec4 imgPixel = texture2D(img, vUv);
    gl_FragColor = imgPixel;
}

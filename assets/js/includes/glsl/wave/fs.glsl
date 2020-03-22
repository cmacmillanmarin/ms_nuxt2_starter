precision highp float;

varying vec2 vUv;
varying float noise;
uniform sampler2D img;

void main() {
    
    vec4 imgPixel = texture2D(img, vUv + noise * 0.1);
    
    // float r = texture2D(uTexture, vUv).r;
    // float g = texture2D(uTexture, vUv).g;
    // float b = texture2D(uTexture, vUv + noise * 0.1).b;
    // imgPixel = vec4(r, g, b, 1.0);

    gl_FragColor = imgPixel;
}

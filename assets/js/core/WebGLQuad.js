import {
    Renderer,
    OrthographicCamera,
    Scene,
    Material,
    Mesh,
    PlaneBufferGeometry
} from "~/assets/js/core/webgl/index";

export default class WebGLQuad {
    constructor(canvas, material) {
        this.renderer = new Renderer({canvas: canvas});

        this.camera = new OrthographicCamera(
            -2,
            2,
            2,
            -2,
            0.1,
            1000
        );

        this.camera.scale.y *= -1; // invert y axis - positive y going down;
        this.scene = new Scene();
        const geometry = new PlaneBufferGeometry(1, 1, 1, 1);
        this.material = new Material(material);
        this.mesh = new Mesh(geometry, this.material);
        this.mesh.position.z = -1;
        this.scene.add(this.mesh);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    resize(w, h) {
        this.camera.left = w / -2;
        this.camera.right = w / 2;
        this.camera.top = h / 2;
        this.camera.bottom = h / -2;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
        this.mesh.scale.x = w;
        this.mesh.scale.y = h;
    }

    destroy() {

    }
};

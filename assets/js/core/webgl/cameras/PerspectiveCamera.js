import Camera from "./Camera";

class PerspectiveCamera extends Camera {
    updateProjectionMatrix() {
        const near = this.near;
        const top = near * Math.tan((Math.PI / 180) * 0.5 * this.fov);
        const height = 2 * top;
        const width = this.aspect * height;
        const left = -0.5 * width;

        this.projectionMatrix.perspective(left, left + width, top, top - height, near, this.far);
    }

    constructor(fov, aspect, near, far) {
        super();
        this.type = "PerspectiveCamera";

        this.fov = fov !== undefined ? fov : 50;

        this.near = near !== undefined ? near : 0.1;
        this.far = far !== undefined ? far : 2000;

        this.aspect = aspect !== undefined ? aspect : 1;

        this.updateProjectionMatrix();
    }
}

export default PerspectiveCamera;

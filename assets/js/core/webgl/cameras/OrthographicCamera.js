import Camera from "./Camera";

class OrthographicCamera extends Camera {
    updateProjectionMatrix() {
        const dx = (this.right - this.left) / (2 * this.zoom);
        const dy = (this.top - this.bottom) / (2 * this.zoom);
        const cx = (this.right + this.left) / 2;
        const cy = (this.top + this.bottom) / 2;

        const left = cx - dx;
        const right = cx + dx;
        const top = cy + dy;
        const bottom = cy - dy;

        this.projectionMatrix.orthographic(left, right, top, bottom, this.near, this.far);
    }

    constructor(left, right, top, bottom, near, far) {
        super();
        this.type = "OrthographicCamera";

        this.zoom = 1;
        this.view = null;

        this.left = (left !== undefined) ? left : -1;
        this.right = (right !== undefined) ? right : 1;
        this.top = (top !== undefined) ? top : 1;
        this.bottom = (bottom !== undefined) ? bottom : -1;

        this.near = (near !== undefined) ? near : 0.1;
        this.far = (far !== undefined) ? far : 2000;

        this.updateProjectionMatrix();
    }
}

export default OrthographicCamera;

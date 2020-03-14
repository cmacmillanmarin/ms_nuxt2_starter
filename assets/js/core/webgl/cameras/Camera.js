import Object3D from "./../Object3D";
import Matrix4 from "./../Matrix4";

class Camera extends Object3D {
    get matrixWorldInverse() {
        return this._matrixWorldInverse;
    }

    get projectionMatrix() {
        return this._projectionMatrix;
    }

    updateMatrixWorld() {
        super.updateMatrixWorld();
        this.matrixWorldInverse.getInverse(this.matrixWorld);
    }

    constructor() {
        super();
        this._matrixWorldInverse = new Matrix4();
        this._projectionMatrix = new Matrix4();
    }
}

export default Camera;

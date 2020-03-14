import {getUniqueStr} from "./utils";
import Matrix4 from "./Matrix4";
import Vector3 from "./Vector3";
import Quaternion from "./Quaternion";

class Object3D {
    get id() {
        return this._id;
    }

    get position() {
        return this._position;
    }

    get up() {
        return this._up;
    }

    get scale() {
        return this._scale;
    }

    get rotation() {
        return this._rotation;
    }

    get quaternion() {
        return this._quaternion;
    }

    get parent() {
        return this._parent;
    }

    set parent(obj) {
        this._parent = obj;
    }

    get children() {
        return this._children;
    }

    get matrix() {
        return this._matrix;
    }

    get matrixWorld() {
        return this._matrixWorld;
    }

    get modelViewMatrix() {
        return this._modelViewMatrix;
    }

    constructor() {
        this._id = getUniqueStr();

        this._position = new Vector3();

        this._up = new Vector3(0, 1, 0);

        this._scale = new Vector3(1, 1, 1);

        this._rotation = new Vector3();

        this._quaternion = new Quaternion();

        this._parent = null;

        this._children = [];

        this._matrix = new Matrix4();

        this._matrixWorld = new Matrix4();

        this._modelViewMatrix = new Matrix4();

        this._matrixWorldNeedsUpdate = false;

        this.rotation.onChange(this._onChangeRotation);
    }

    add(obj) {
        this._children.push(obj);
        obj.parent = this;
    }

    updateMatrix() {
        this._matrix.compose(
            this._position,
            this._quaternion,
            this._scale
        );
        this._matrixWorldNeedsUpdate = true;
    }

    updateMatrixWorld() {
        this.updateMatrix();

        if (this._matrixWorldNeedsUpdate) {
            if (this._parent) {
                this._matrixWorld.multiplyMatrices(
                    this._parent.matrixWorld,
                    this._matrix
                );
            } else {
                this._matrixWorld.copy(this.matrix);
            }

            this._matrixWorldNeedsUpdate = false;
        }

        // update children
        const children = this._children;
        for (let i = 0, l = children.length; i < l; i++) {
            children[i].updateMatrixWorld();
        }
    }

    _onChangeRotation = ()=>{
        this._quaternion.setFromEuler(this._rotation);
    };
}

export default Object3D;

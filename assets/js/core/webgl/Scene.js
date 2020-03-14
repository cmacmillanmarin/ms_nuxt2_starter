import Object3D from "./Object3D";

class Scene extends Object3D {
    _needsUpdate = true;
    get needsUpdate() {
        return this._needsUpdate;
    }

    set needsUpdate(flag) {
        this._needsUpdate = flag;
    }
}

export default Scene;

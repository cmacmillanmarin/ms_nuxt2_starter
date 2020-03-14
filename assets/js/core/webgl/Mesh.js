import Object3D from "./Object3D";

class Mesh extends Object3D {
    get geometry() {
        return this._geometry;
    }

    get material() {
        return this._material;
    }

    constructor(geometry, material) {
        super();

        this._geometry = geometry;
        this._material = material;
    }
}

export default Mesh;

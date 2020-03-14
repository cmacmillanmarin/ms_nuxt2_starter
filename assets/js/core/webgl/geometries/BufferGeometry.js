class BufferGeometry {
    get attributes() {
        return this._attributes;
    }

    get index() {
        return this._index;
    }

    set index(index) {
        this._index = index;
    }

    setAttribute(name, stride, vertices = []) {
        this._attributes[name] = {stride, vertices};
    }

    constructor() {
        this._attributes = {};
        this._index = [];
    }
}

export default BufferGeometry;

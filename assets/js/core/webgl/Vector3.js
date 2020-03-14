class Vector3 {
    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
        this._onChangeCallback();
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
        this._onChangeCallback();
    }

    get z() {
        return this._z;
    }

    set z(value) {
        this._z = value;
        this._onChangeCallback();
    }

    set(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    onChange(callback) {
        this._onChangeCallback = callback;

        return this;
    }

    _onChangeCallback() {}

    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
}

export default Vector3;

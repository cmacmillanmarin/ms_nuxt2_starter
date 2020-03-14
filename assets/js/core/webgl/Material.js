import Matrix4 from "./Matrix4";
import {Side} from "./utils";

const Blending = Object.freeze({NO: "BLENDING_NO"});

class Material {
    _uniforms = {
        mMatrix: {
            type: "v4",
            value: new Matrix4()
        },
        vMatrix: {
            type: "v4",
            value: new Matrix4()
        },
        pMatrix: {
            type: "v4",
            value: new Matrix4()
        },
        mvMatrix: {
            type: "v4",
            value: new Matrix4()
        }
    };

    get uniforms() {
        return this._uniforms;
    }

    get vertexShader() {
        return this._vertexShader;
    }

    get fragmentShader() {
        return this._fragmentShader;
    }

    get transparent() {
        return this._transparent;
    }

    get side() {
        return this._side;
    }

    get blending() {
        return this._blending;
    }

    get needsUpdate() {
        return this._needsUpdate;
    }

    set needsUpdate(flag) {
        this._needsUpdate = flag;
    }

    constructor(props) {
        this._needsUpdate = true;
        this._vertexShader = "";
        this._fragmentShader = "";
        this._transparent = false;
        this._side = Side.FRONT;
        this._blending = Blending.NO;
        this._uniforms = {
            ...this._uniforms,
            ...props.uniforms
        };
        this._vertexShader = props.vertexShader;
        this._fragmentShader = props.fragmentShader;
        this._transparent = props.transparent || false;
        this._side = props.side || this._side;
        this._blending = props.blending || Blending.NO;
        this._maps = [];
    }
}

export default Material;

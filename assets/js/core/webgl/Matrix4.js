class Matrix4 {
    get el() {
        return this._el;
    }

    constructor() {
        this._el = new Float32Array(16);
        this.identity();
    }

    identity() {
        this._el[0] = 1;
        this._el[1] = 0;
        this._el[2] = 0;
        this._el[3] = 0;

        this._el[4] = 0;
        this._el[5] = 1;
        this._el[6] = 0;
        this._el[7] = 0;

        this._el[8] = 0;
        this._el[9] = 0;
        this._el[10] = 1;
        this._el[11] = 0;

        this._el[12] = 0;
        this._el[13] = 0;
        this._el[14] = 0;
        this._el[15] = 1;

        return this;
    }

    multiply(mat) {
        this.multiplyMatrices(this, mat);
        return this;
    }

    multiplyMatrices(aMat, bMat) {
        const aEl = aMat.el;
        const bEl = bMat.el;

        const a = aEl[0];
        const b = aEl[1];
        const c = aEl[2];
        const d = aEl[3];
        const e = aEl[4];
        const f = aEl[5];
        const g = aEl[6];
        const h = aEl[7];
        const i = aEl[8];
        const j = aEl[9];
        const k = aEl[10];
        const l = aEl[11];
        const m = aEl[12];
        const n = aEl[13];
        const o = aEl[14];
        const p = aEl[15];

        const A = bEl[0];
        const B = bEl[1];
        const C = bEl[2];
        const D = bEl[3];
        const E = bEl[4];
        const F = bEl[5];
        const G = bEl[6];
        const H = bEl[7];
        const I = bEl[8];
        const J = bEl[9];
        const K = bEl[10];
        const L = bEl[11];
        const M = bEl[12];
        const N = bEl[13];
        const O = bEl[14];
        const P = bEl[15];

        this._el[0] = A * a + B * e + C * i + D * m;
        this._el[1] = A * b + B * f + C * j + D * n;
        this._el[2] = A * c + B * g + C * k + D * o;
        this._el[3] = A * d + B * h + C * l + D * p;

        this._el[4] = E * a + F * e + G * i + H * m;
        this._el[5] = E * b + F * f + G * j + H * n;
        this._el[6] = E * c + F * g + G * k + H * o;
        this._el[7] = E * d + F * h + G * l + H * p;

        this._el[8] = I * a + J * e + K * i + L * m;
        this._el[9] = I * b + J * f + K * j + L * n;
        this._el[10] = I * c + J * g + K * k + L * o;
        this._el[11] = I * d + J * h + K * l + L * p;

        this._el[12] = M * a + N * e + O * i + P * m;
        this._el[13] = M * b + N * f + O * j + P * n;
        this._el[14] = M * c + N * g + O * k + P * o;
        this._el[15] = M * d + N * h + O * l + P * p;

        return this;
    }

    scale(vec) {
        this._el[0] = this._el[0] * vec[0];
        this._el[1] = this._el[1] * vec[0];
        this._el[2] = this._el[2] * vec[0];
        this._el[3] = this._el[3] * vec[0];

        this._el[4] = this._el[4] * vec[1];
        this._el[5] = this._el[5] * vec[1];
        this._el[6] = this._el[6] * vec[1];
        this._el[7] = this._el[7] * vec[1];

        this._el[8] = this._el[8] * vec[2];
        this._el[9] = this._el[9] * vec[2];
        this._el[10] = this._el[10] * vec[2];
        this._el[11] = this._el[11] * vec[2];

        return this;
    }

    translate(vec3) {
        this._el[12] =
            this._el[0] * vec3[0] +
            this._el[4] * vec3[1] +
            this._el[8] * vec3[2] +
            this._el[12];
        this._el[13] =
            this._el[1] * vec3[0] +
            this._el[5] * vec3[1] +
            this._el[9] * vec3[2] +
            this._el[13];
        this._el[14] =
            this._el[2] * vec3[0] +
            this._el[6] * vec3[1] +
            this._el[10] * vec3[2] +
            this._el[14];
        this._el[15] =
            this._el[3] * vec3[0] +
            this._el[7] * vec3[1] +
            this._el[11] * vec3[2] +
            this._el[15];

        return this;
    }

    rotate(angle, axis) {
        let sq = Math.sqrt(
            axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]
        );

        if (!sq) {
            return;
        }

        let a = axis[0];
        let b = axis[1];
        let c = axis[2];

        if (sq !== 1) {
            sq = 1 / sq;
            a *= sq;
            b *= sq;
            c *= sq;
        }

        const d = Math.sin(angle);
        const e = Math.cos(angle);
        const f = 1 - e;
        const g = this._el[0];
        const h = this._el[1];
        const i = this._el[2];
        const j = this._el[3];
        const k = this._el[4];
        const l = this._el[5];
        const m = this._el[6];
        const n = this._el[7];
        const o = this._el[8];
        const p = this._el[9];
        const q = this._el[10];
        const r = this._el[11];
        const s = a * a * f + e;
        const t = b * a * f + c * d;
        const u = c * a * f - b * d;
        const v = a * b * f - c * d;
        const w = b * b * f + e;
        const x = c * b * f + a * d;
        const y = a * c * f + b * d;
        const z = b * c * f - a * d;
        const A = c * c * f + e;

        this._el[0] = g * s + k * t + o * u;
        this._el[1] = h * s + l * t + p * u;
        this._el[2] = i * s + m * t + q * u;
        this._el[3] = j * s + n * t + r * u;

        this._el[4] = g * v + k * w + o * x;
        this._el[5] = h * v + l * w + p * x;
        this._el[6] = i * v + m * w + q * x;
        this._el[7] = j * v + n * w + r * x;

        this._el[8] = g * y + k * z + o * A;
        this._el[9] = h * y + l * z + p * A;
        this._el[10] = i * y + m * z + q * A;
        this._el[11] = j * y + n * z + r * A;

        return this;
    }

    lookAt(eye, center, up) {
        const eyeX = eye.x;
        const eyeY = eye.y;
        const eyeZ = eye.z;
        const upX = up.x;
        const upY = up.y;
        const upZ = up.z;
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;

        if (eyeX === centerX && eyeY === centerY && eyeZ === centerZ) {
            this.identity();
            return;
        }

        let x0, x1, x2, y0, y1, y2, z0, z1, z2, l;
        z0 = eyeX - center.x;
        z1 = eyeY - center.y;
        z2 = eyeZ - center.z;
        l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= l;
        z1 *= l;
        z2 *= l;
        x0 = upY * z2 - upZ * z1;
        x1 = upZ * z0 - upX * z2;
        x2 = upX * z1 - upY * z0;
        l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);

        if (!l) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            l = 1 / l;
            x0 *= l;
            x1 *= l;
            x2 *= l;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;
        l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);

        if (!l) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            l = 1 / l;
            y0 *= l;
            y1 *= l;
            y2 *= l;
        }

        this._el[0] = x0;
        this._el[1] = y0;
        this._el[2] = z0;
        this._el[3] = 0;

        this._el[4] = x1;
        this._el[5] = y1;
        this._el[6] = z1;
        this._el[7] = 0;

        this._el[8] = x2;
        this._el[9] = y2;
        this._el[10] = z2;
        this._el[11] = 0;

        this._el[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
        this._el[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
        this._el[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
        this._el[15] = 1;

        return this;
    }

    perspective(left, right, top, bottom, near, far) {
        const x = 2 * near / (right - left);
        const y = 2 * near / (top - bottom);

        const a = (right + left) / (right - left);
        const b = (top + bottom) / (top - bottom);
        const c = -(far + near) / (far - near);
        const d = -2 * far * near / (far - near);

        this._el[0] = x;
        this._el[1] = 0;
        this._el[2] = 0;
        this._el[3] = 0;

        this._el[4] = 0;
        this._el[5] = y;
        this._el[6] = 0;
        this._el[7] = 0;

        this._el[8] = a;
        this._el[9] = b;
        this._el[10] = c;
        this._el[11] = -1;

        this._el[12] = 0;
        this._el[13] = 0;
        this._el[14] = d;
        this._el[15] = 0;

        return this;
    }

    orthographic(left, right, top, bottom, near, far) {
        const w = 1.0 / (right - left);
        const h = 1.0 / (top - bottom);
        const p = 1.0 / (far - near);

        const x = (right + left) * w;
        const y = (top + bottom) * h;
        const z = (far + near) * p;

        this._el[0] = 2 * w;
        this._el[1] = 0;
        this._el[2] = 0;
        this._el[3] = 0;
        this._el[4] = 0;
        this._el[5] = 2 * h;
        this._el[6] = 0;
        this._el[7] = 0;
        this._el[8] = 0;
        this._el[9] = 0;
        this._el[10] = -2 * p;
        this._el[11] = 0;
        this._el[12] = -x;
        this._el[13] = -y;
        this._el[14] = -z;
        this._el[15] = 1;

        return this;
    }

    transpose() {
        const a = this._el[0];
        const b = this._el[1];
        const c = this._el[2];
        const d = this._el[3];
        const e = this._el[4];
        const f = this._el[5];
        const g = this._el[6];
        const h = this._el[7];
        const i = this._el[8];
        const j = this._el[9];
        const k = this._el[10];
        const l = this._el[11];
        const m = this._el[12];
        const n = this._el[13];
        const o = this._el[14];
        const p = this._el[15];

        this._el[0] = a;
        this._el[1] = e;
        this._el[2] = i;
        this._el[3] = m;

        this._el[4] = b;
        this._el[5] = f;
        this._el[6] = j;
        this._el[7] = n;

        this._el[8] = c;
        this._el[9] = g;
        this._el[10] = k;
        this._el[11] = o;

        this._el[12] = d;
        this._el[13] = h;
        this._el[14] = l;
        this._el[15] = p;

        return this;
    }

    inverse() {
        const a = this._el[0];
        const b = this._el[1];
        const c = this._el[2];
        const d = this._el[3];
        const e = this._el[4];
        const f = this._el[5];
        const g = this._el[6];
        const h = this._el[7];
        const i = this._el[8];
        const j = this._el[9];
        const k = this._el[10];
        const l = this._el[11];
        const m = this._el[12];
        const n = this._el[13];
        const o = this._el[14];
        const p = this._el[15];

        const q = a * f - b * e;
        const r = a * g - c * e;
        const s = a * h - d * e;
        const t = b * g - c * f;
        const u = b * h - d * f;
        const v = c * h - d * g;
        const w = i * n - j * m;
        const x = i * o - k * m;
        const y = i * p - l * m;
        const z = j * o - k * n;
        const A = j * p - l * n;
        const B = k * p - l * o;
        const ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);

        this._el[0] = (f * B - g * A + h * z) * ivd;
        this._el[1] = (-b * B + c * A - d * z) * ivd;
        this._el[2] = (n * v - o * u + p * t) * ivd;
        this._el[3] = (-j * v + k * u - l * t) * ivd;

        this._el[4] = (-e * B + g * y - h * x) * ivd;
        this._el[5] = (a * B - c * y + d * x) * ivd;
        this._el[6] = (-m * v + o * s - p * r) * ivd;
        this._el[7] = (i * v - k * s + l * r) * ivd;

        this._el[8] = (e * A - f * y + h * w) * ivd;
        this._el[9] = (-a * A + b * y - d * w) * ivd;
        this._el[10] = (m * u - n * s + p * q) * ivd;
        this._el[11] = (-i * u + j * s - l * q) * ivd;

        this._el[12] = (-e * z + f * x - g * w) * ivd;
        this._el[13] = (a * z - b * x + c * w) * ivd;
        this._el[14] = (-m * t + n * r - o * q) * ivd;
        this._el[15] = (i * t - j * r + k * q) * ivd;

        return this;
    }

    clone() {
        const newMat = new Matrix4();
        const a = this._el[0];
        const b = this._el[1];
        const c = this._el[2];
        const d = this._el[3];
        const e = this._el[4];
        const f = this._el[5];
        const g = this._el[6];
        const h = this._el[7];
        const i = this._el[8];
        const j = this._el[9];
        const k = this._el[10];
        const l = this._el[11];
        const m = this._el[12];
        const n = this._el[13];
        const o = this._el[14];
        const p = this._el[15];

        newMat.el[0] = a;
        newMat.el[1] = b;
        newMat.el[2] = c;
        newMat.el[3] = d;

        newMat.el[4] = e;
        newMat.el[5] = f;
        newMat.el[6] = g;
        newMat.el[7] = h;

        newMat.el[8] = i;
        newMat.el[9] = j;
        newMat.el[10] = k;
        newMat.el[11] = l;

        newMat.el[12] = m;
        newMat.el[13] = n;
        newMat.el[14] = o;
        newMat.el[15] = p;

        return newMat;
    }

    copy(mat) {
        this._el[0] = mat.el[0];
        this._el[1] = mat.el[1];
        this._el[2] = mat.el[2];
        this._el[3] = mat.el[3];

        this._el[4] = mat.el[4];
        this._el[5] = mat.el[5];
        this._el[6] = mat.el[6];
        this._el[7] = mat.el[7];

        this._el[8] = mat.el[8];
        this._el[9] = mat.el[9];
        this._el[10] = mat.el[10];
        this._el[11] = mat.el[11];

        this._el[12] = mat.el[12];
        this._el[13] = mat.el[13];
        this._el[14] = mat.el[14];
        this._el[15] = mat.el[15];

        return this;
    }

    compose(position, quaternion, scale) {
        const x = quaternion.x;
        const y = quaternion.y;
        const z = quaternion.z;
        const w = quaternion.w;
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;

        const sx = scale.x;
        const sy = scale.y;
        const sz = scale.z;

        this._el[0] = (1 - (yy + zz)) * sx;
        this._el[1] = (xy + wz) * sx;
        this._el[2] = (xz - wy) * sx;
        this._el[3] = 0;

        this._el[4] = (xy - wz) * sy;
        this._el[5] = (1 - (xx + zz)) * sy;
        this._el[6] = (yz + wx) * sy;
        this._el[7] = 0;

        this._el[8] = (xz + wy) * sz;
        this._el[9] = (yz - wx) * sz;
        this._el[10] = (1 - (xx + yy)) * sz;
        this._el[11] = 0;

        this._el[12] = position.x;
        this._el[13] = position.y;
        this._el[14] = position.z;
        this._el[15] = 1;

        return this;
    }

    getInverse(mat) {
        const a = mat.el[0];
        const b = mat.el[1];
        const c = mat.el[2];
        const d = mat.el[3];
        const e = mat.el[4];
        const f = mat.el[5];
        const g = mat.el[6];
        const h = mat.el[7];
        const i = mat.el[8];
        const j = mat.el[9];
        const k = mat.el[10];
        const l = mat.el[11];
        const m = mat.el[12];
        const n = mat.el[13];
        const o = mat.el[14];
        const p = mat.el[15];
        const q = a * f - b * e;
        const r = a * g - c * e;
        const s = a * h - d * e;
        const t = b * g - c * f;
        const u = b * h - d * f;
        const v = c * h - d * g;
        const w = i * n - j * m;
        const x = i * o - k * m;
        const y = i * p - l * m;
        const z = j * o - k * n;
        const A = j * p - l * n;
        const B = k * p - l * o;
        const ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
        this._el[0] = (f * B - g * A + h * z) * ivd;
        this._el[1] = (-b * B + c * A - d * z) * ivd;
        this._el[2] = (n * v - o * u + p * t) * ivd;
        this._el[3] = (-j * v + k * u - l * t) * ivd;
        this._el[4] = (-e * B + g * y - h * x) * ivd;
        this._el[5] = (a * B - c * y + d * x) * ivd;
        this._el[6] = (-m * v + o * s - p * r) * ivd;
        this._el[7] = (i * v - k * s + l * r) * ivd;
        this._el[8] = (e * A - f * y + h * w) * ivd;
        this._el[9] = (-a * A + b * y - d * w) * ivd;
        this._el[10] = (m * u - n * s + p * q) * ivd;
        this._el[11] = (-i * u + j * s - l * q) * ivd;
        this._el[12] = (-e * z + f * x - g * w) * ivd;
        this._el[13] = (a * z - b * x + c * w) * ivd;
        this._el[14] = (-m * t + n * r - o * q) * ivd;
        this._el[15] = (i * t - j * r + k * q) * ivd;

        return this;
    }
}

export default Matrix4;

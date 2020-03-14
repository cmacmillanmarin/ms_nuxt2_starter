import BufferGeometry from "./BufferGeometry";

class PlaneBufferGeometry extends BufferGeometry {
    constructor(width, height, widthSegments, heightSegments) {
        super();

        this.type = "PlaneBufferGeometry";

        this.parameters = {
            width: width,
            height: height,
            widthSegments: widthSegments,
            heightSegments: heightSegments
        };

        width = width || 1;
        height = height || 1;

        const widthHalf = width / 2;
        const heightHalf = height / 2;

        const gridX = Math.floor(widthSegments) || 1;
        const gridY = Math.floor(heightSegments) || 1;

        const gridX1 = gridX + 1;
        const gridY1 = gridY + 1;

        const segmentWidth = width / gridX;
        const segmentHeight = height / gridY;

        let ix, iy;

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];

        for (iy = 0; iy < gridY1; iy++) {
            const y = iy * segmentHeight - heightHalf;

            for (ix = 0; ix < gridX1; ix++) {
                const x = ix * segmentWidth - widthHalf;

                vertices.push(x, -y, 0);

                normals.push(0, 0, 1);

                uvs.push(ix / gridX);
                uvs.push(1 - (iy / gridY));
            }
        }

        for (iy = 0; iy < gridY; iy++) {
            for (ix = 0; ix < gridX; ix++) {
                const a = ix + gridX1 * iy;
                const b = ix + gridX1 * (iy + 1);
                const c = (ix + 1) + gridX1 * (iy + 1);
                const d = (ix + 1) + gridX1 * iy;

                // faces

                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        this.index = indices;
        this.setAttribute("position", 3, vertices);
        this.setAttribute("normal", 3, normals);
        this.setAttribute("uv", 2, uvs);
    }
}

export default PlaneBufferGeometry;

//
//  mixins/MediaSource.js

export default {
    data() {
        return {
            lastWidth: 400,
            gapChangeImage: 400
        };
    },
    methods: {
        getImageSourceFromObject({src}, width = parseInt(process.env.assetGap)) {
            const w = (Math.floor(width / this.gapChangeImage) * this.gapChangeImage) + this.gapChangeImage;
            return `assets/${w}/${src}`;
        }
    }
};

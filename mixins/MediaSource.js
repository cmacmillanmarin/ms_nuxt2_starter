//
//  mixins/MediaSource.js

export default {
    data() {
        return {
            lastWidth: parseInt(process.env.assetGap),
            gapChangeImage: parseInt(process.env.assetGap)
        };
    },
    methods: {
        getImageSourceFromObject({src}, width = parseInt(process.env.assetGap)) {
            const w = (Math.floor(width / this.gapChangeImage) * this.gapChangeImage) + this.gapChangeImage;
            return `/img/${w}/${src}`;
        }
    }
};

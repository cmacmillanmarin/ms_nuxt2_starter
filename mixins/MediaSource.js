//
//  mixins/MediaSource.js

import {mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            vw: state=>state.viewportSize.w
        })
    },
    data() {
        return {
            baseUrl: process.env.baseUrl,
            availables: [256, 512, 1024, 2048]
        };
    },
    methods: {
        getImageSourceFromId(id, width) {
            return this.getImageSourceFromObject(this.$core.content.assets[id], width);
        },
        getImageSourceFromObject({src}, width) {
            const w = width || this.vw;
            return `${this.baseUrl}/img/${this.getClosest(w)}/${src}`;
        },
        getClosest(width) {
            return this.availables.reduce((prev, curr)=>{
                return (Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev);
            });
        }
    }
};

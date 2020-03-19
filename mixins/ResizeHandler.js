//
//  mixins/ResizeHandler.js

import {mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            resize: state=>state.resize
        })
    },
    watch: {
        resize() {
            this.$nextTick(this.onResize);
        }
    },
    methods: {
        onResize() {
            console.log("Resize");
        }
    }
};

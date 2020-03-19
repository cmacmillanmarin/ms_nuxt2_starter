//
//  mixins/ResizeHandler.js

import {mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            vs: state=>state.viewportSize
        })
    },
    data() {
        return {
            template: "desktop",
            isMobileTemplate: false,
            isTabletTemplate: false,
            isDesktopTemplate: false
        };
    },
    watch: {
        vs: {
            handler: function() {
                this.updateTemplate();
            },
            deep: true
        }
    },
    mounted() {
        this.updateTemplate();
    },
    methods: {
        updateTemplate() {
            this.template = this.$store.state.template;
            this.isMobileTemplate = this.$store.getters.isMobileTemplate;
            this.isTabletTemplate = this.$store.getters.isTabletTemplate;
            this.isDesktopTemplate = this.$store.getters.isDesktopTemplate;
        }
    }
};

//
//  components/types/mixins/LifecycleHooks.js

export default {
    created() {
        this.setInitValue();
    },
    mounted() {
        this.init();
        this.setListeners();
    },
    methods: {
        setInitValue() {},
        init() {},
        setListeners() {},
        destroyListeners()  {}
    },
    beforeDestroy() {
        this.destroyListeners();
    }
};

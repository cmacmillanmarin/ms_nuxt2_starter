<!--
    components/Threejs.vue
-->

<template>
    <canvas class="threejs" />
</template>

<script>

import {mapState} from "vuex";

import MediaSource from "~/mixins/MediaSource";
import ResizeHandler from "~/mixins/ResizeHandler";
import LifecycleHooks from "~/mixins/LifecycleHooks";

export default {
    name: "Threejs",
    mixins: [LifecycleHooks, MediaSource, ResizeHandler],
    props: {
        image: Object
    },
    computed: {
        ...mapState({
            vs: state=>state.viewportSize,
            dpr: state=>state.devicePixelRatio
        }),
        preload() {
            return [
                {type: "library", src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"},
                {type: "library", src: "https://threejs.org/examples/js/controls/OrbitControls.js"},
                {type: "img", src: `${process.env.baseUrl}/img/Tokyo.jpg`}
            ];
        }
    },
    methods: {
        async init() {
            this._loaded = 0;
            this._onMessage = this.onMessage.bind(this);
            this._loader = await this.$core.loader.get();
            this._loader.worker.postMessage({index: this._loader.index, ...this.preload[this._loaded]});
            this._loader.worker.addEventListener("message", this._onMessage);
        },
        async onMessage(e) {
            const {type, src} = e.data
            if (type === "library") {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = src;
                document.body.appendChild(script);
                script.onload = this.onLoaded.bind(this);
            } else if (type === "img") {
                this._img = new Image();
                this._img.src = src;
                await this._img.decode();
                URL.revokeObjectURL(src);
                this.onLoaded();
            }            
        },
        onLoaded() {
            this._loaded++;
            if (this._loaded === this.preload.length) {
                this._loader.worker.removeEventListener("message", this._onMessage); 
                this.start();
            } else {
                this._loader.worker.postMessage({index: this._loader.index, ...this.preload[this._loaded]});
            }
        },
        start() {
            const {
                Scene,
                PerspectiveCamera,
                WebGLRenderer,
                PlaneBufferGeometry,
                MeshBasicMaterial,
                Mesh,
                DoubleSide,
                Vector3,
                OrbitControls
            } = THREE;

            this.scene = new Scene();

            this.renderer = new WebGLRenderer({canvas: this.$el, alpha: true});
            this.renderer.setClearColor(0x000000, 0);
			this.renderer.setPixelRatio(this.dpr);
			this.renderer.setSize(this.vs.w, this.vs.h);

            this.camera = new PerspectiveCamera(45, this.vs.w / this.vs.h , 1, 1000);
            this.camera.position.set(0, 0, 200);

            this.controls = new OrbitControls(this.camera, this.$el);

            this.plane = new Mesh(
                new PlaneBufferGeometry(0.5, 0.7, 16, 16),
                new MeshBasicMaterial({
                    color: 0x000000, 
                    side: DoubleSide,
                    wireframe: true,
                })
            );
            this.plane.scale.x = 100;
            this.plane.scale.y = 100;
            this.scene.add(this.plane);

            this.renderHandler = this.render.bind(this);
            this.$core.events.addEventListener(this.$core.events.RAF, this.renderHandler);
        },
        render(e) {
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        },
        onResize() {
            const {w, h} = this.vs;
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
        },
        removeListeners() {
            this.$core.events.removeEventListener(this.$core.events.RAF, this.renderHandler);
        }
    }
};
</script>

<style lang="scss">
    .threejs {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

<!--
    layouts/error.vue
-->

<template>
    <div class="l-error">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
    </div>
</template>

<script>
    export default {
        props: ['error'],
        mounted() {
            console.log("ERROR LAYOUT");
        }
    }
</script>

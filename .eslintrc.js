module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    plugins: ['vue'],
    rules: {
        'no-console': 'off',
        'vue/no-v-html': 0,
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': 0,
        'vue/no-unused-components': 0,
        'vue/require-component-is': 0,
        'vue/attributes-order': 0,
        'vue/valid-template-root': 0,
        'import/first': false,
        'arrow-spacing': ['error', { before: false, after: false }],
        'space-before-function-paren': ['error', 'never'],
        "object-curly-spacing": ["error", "never"],
        "node/no-deprecated-api": 0,
        "new-cap": 0,
        indent: ['error', 4],
        semi: ['error', 'always'],
        quotes: ['error', 'double'],
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
};

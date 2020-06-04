module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        "plugin:node/recommended",
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "node/prefer-global/buffer": ["error", "always"],
        "node/prefer-global/console": ["error", "always"],
        "node/prefer-global/process": ["error", "always"],
        "node/prefer-global/url-search-params": ["error", "always"],
        "node/prefer-global/url": ["error", "always"],
        "node/prefer-promises/dns": "error",
        "node/prefer-promises/fs": "error",
        "node/no-unsupported-features/es-syntax": "off"
    }
};
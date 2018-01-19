module.exports = {
    "parser": 'babel-eslint',
    "parserOptions": {
        // env.es6 = true 会自动设置 ecmaVersion = 6
        // "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true

    },
    "extends": [
        "standard",
        "plugin:react/recommended" // jsx no-unused-vars
    ]
};

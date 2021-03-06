module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    extends: "eslint:recommended",
    parserOptions: {
        "ecmaVersion": 12
    },
    rules: {
        indent: [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        quotes: [
            "error",
            "double"
        ],
        semi: [
            "error",
            "always"
        ],
        "no-unused-vars": [
            "warn",
            {
                vars: "local",
                args: "after-used",
                argsIgnorePattern: "^_|^next$|^req$|^res$"
            }
        ],
    }
};

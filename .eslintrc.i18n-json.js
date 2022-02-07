const path = require("path");
module.exports = {
    rules: {
        "i18n-json/identical-keys": [
            2,
            {
                filePath: path.resolve("./src/locales/translationEn.json"),
            },
        ],
        "i18n-json/valid-json": 0,
        "i18n-json/valid-message-syntax": 0,
    },
    extends: ["plugin:i18n-json/recommended"],
};

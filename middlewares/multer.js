const multer = require("multer");

module.exports = {
    single(key) {
        return multer().single(key);
    },
    any() {
        return multer().any();
    }
};

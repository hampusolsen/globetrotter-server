const multer = require("multer");

class MulterAPI {
    single(key) {
        return multer().single(key);
    }
}

const Multer = new MulterAPI();

module.exports = Multer;

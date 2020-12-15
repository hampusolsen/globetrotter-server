const { Readable } = require("stream");
const cloudinary = require("../config/cloudinary");

module.exports = {
    streamImageBuffer(buffer, folder) {
        return new Promise((resolve, reject) => {
            const readStream = new Readable();

            readStream.push(buffer);
            readStream.push(null);

            const writeStream = cloudinary.uploader.upload_stream({
                folder,
                discard_original_filename: false,
                overwrite: true,
            }, (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            });

            readStream.pipe(writeStream);
        });
    }
};

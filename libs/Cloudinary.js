const { Duplex } = require("stream");
const cloudinary = require("../config/cloudinary");

class CloudinaryAPI {
    streamImageBuffer(buffer, folder) {
        return new Promise((resolve, reject) => {
            const readStream = new Duplex();

            readStream.push(buffer);
            readStream.push(null);

            const uploadStream = cloudinary.uploader.upload_stream({
                folder,
                discard_original_filename: false,
                overwrite: true,
            }, (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            });

            readStream.pipe(uploadStream);

        });
    }

}

const Cloudinary = new CloudinaryAPI();

module.exports = Cloudinary;

// cloudConfig.js

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { Readable } = require("stream");

// ENV CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Multer memory storage
const storage = multer.memoryStorage();

// Stream upload function
async function uploadToCloudinary(fileBuffer, folderName = "Hostify_DEV") {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: folderName },
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );

        const readable = new Readable();
        readable.push(fileBuffer);
        readable.push(null);
        readable.pipe(stream);
    });
}

module.exports = { cloudinary, storage, uploadToCloudinary };

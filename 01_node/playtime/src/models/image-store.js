import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv"

dotenv.config();

const credentials = {
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_key,
    api_secret: process.env.cloudinary_secret,
};

cloudinary.config(credentials);

export const imageStore = {

    getAllImages: async function() {
        const result = await cloudinary.v2.api.resources();
        return result.resources;
    },

    uploadImage: async function(imagefile) {
        writeFileSync("./public/temp.img", imagefile);
        const response = await cloudinary.v2.uploader.upload("./public/temp.img");

        // add image transformation
        const imageUrl = cloudinary.v2.url(response.public_id, {
            secure: true,
            transformation: [
                {
                    width: 512,
                    height: 512,
                    crop: "fill",
                    gravity: "auto",
                    fetch_format: "auto",
                    radius: 50,
                },
            ],
        });

        return imageUrl;
    },

    deleteImage: async function(img) {
        await cloudinary.v2.uploader.destroy(img, {});
    },
}
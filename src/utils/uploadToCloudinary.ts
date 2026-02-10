import cloudinary from "@/config/cloudinary";

export async function uploadToCloudinary(file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
                if (error || !result) return reject(error);

                resolve({
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                    height: result.height,
                    width: result.width,
                    // order: index, // keep the order they were uploaded in
                });
            }
        ).end(buffer);
    });
}

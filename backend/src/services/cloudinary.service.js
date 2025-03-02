const cloudinary = require('cloudinary').v2;
const fs = require('fs');

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) throw new Error('Missing required parameters');
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })
        if (response.url) {
            fs.unlinkSync(localFilePath);
        }
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath);
        throw error;
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) throw new Error('Missing required parameters');
        return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    uploadOnCloudinary,
    deleteFromCloudinary
};
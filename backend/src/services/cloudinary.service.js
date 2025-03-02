const cloudinary = require('cloudinary').v2;
const fs = require('fs');

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dzy9ssfo6', 
        api_key: '931467231933643', 
        api_secret: 'asnX3j_yL3M4JNrpnnuvQQ2NhVc'
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
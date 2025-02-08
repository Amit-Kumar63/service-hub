const providerModel = require('../models/provider.model');

module.exports.createProvider = async ({
    name,
    email,
    token,
    uid,
    image
}) => {
    
    if (!name || !email || !token || !uid) {
        throw new Error('Missing required fields! please fill all fields');
    }
    const provider = await providerModel.create({
        name,
        email,
        token,
        uid,
        image
    });

    return provider;
}
module.exports.findProviderByCredentials = async (email, uid) => {
    try {
        if (!email || !uid) {
            throw new Error('Missing required fields! please fill all fields');
        }
        const provider = await providerModel.findOne({ email, uid });
        if (!provider) {
            return null;
        }
        else {
            return provider;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
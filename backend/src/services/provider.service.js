const providerModel = require('../models/provider.model');

module.exports.createProvider = async ({
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
    location: {
        lat,
        lng
    }
}) => {
    if (!firstName || !email || !password || !address || !phone) {
        throw new Error('Missing required fields! please fill all fields');
    }
    const provider = await providerModel.create({
        firstName,
        lastName,
        email,
        password,
        address,
        phone,
        location: {
            lat,
            lng
        }
    });
    return provider;
}
module.exports.findProviderByCredentials = async (email, password) => {
    const provider = await providerModel.findOne({ email }).select('+password');
    if (!provider) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await provider.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    return provider;
}
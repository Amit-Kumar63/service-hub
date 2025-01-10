const userModel = require('../models/user.model');

module.exports.createUser = async ({
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
    const user = await userModel.create({
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

    return user;
}
module.exports.findUserByCredentials = async (email, password) => {
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    return user;
}
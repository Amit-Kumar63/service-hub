const userModel = require('../models/user.model');

module.exports.createUser = async ({
    name,
    email,
    token,
    uid,
    image
}) => {
    
    if (!name || !email || !token || !uid) {
        throw new Error('Missing required fields! please fill all fields');
    }
    const user = await userModel.create({
        name,
        email,
        token,
        uid,
        image
    });

    return user;
}
module.exports.findUserByCredentials = async (email, uid) => {
    const user = await userModel.findOne({ email, uid })
    if (!user) {
        throw new Error('User not found. Please signup');
    }
    else {
        return user;
    }
}

module.exports.addToFavourites = async (user, serviceId) => {
    try {
        if (user.favourites.includes(serviceId)) {
            const favourites = user.favourites.filter((id) => id.toString() !== serviceId.toString());
            await userModel.findByIdAndUpdate(user._id, { favourites });
            return user;
        } else {
            user.favourites.push(serviceId);
            await user.save();
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}
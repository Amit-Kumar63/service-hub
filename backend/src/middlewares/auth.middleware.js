const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Provider = require('../models/provider.model');

module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findOne({ _id: decoded.id});
        if (!user) {
            throw new Error('Unauthorized');
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}
module.exports.providerAuth = async (req, res, next) => {
    try {
        const token = req.cookies.provider || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const provider = await Provider.findOne({ _id: decoded.id});
        if (!provider) {
            throw new Error('Unauthorized');
        }
        req.token = token;
        req.provider = provider;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}
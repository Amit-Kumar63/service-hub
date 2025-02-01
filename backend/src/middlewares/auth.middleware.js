const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Provider = require('../models/provider.model');
const admin = require('../firebase-admin');

module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken = await admin.auth().verifyIdToken(token)
        if (!decodedToken) return res.status(400).json({ message: 'Invalid token' });

        const user = await User.findOne({ uid: decodedToken.uid });
        if (!user) return res.status(400).json({ message: 'Unauthorized' });
        if (user.uid !== decodedToken.uid) return res.status(400).json({ message: 'Unauthorized request' });
        req.token = decodedToken;
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
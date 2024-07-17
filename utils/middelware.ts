// /middleware/auth.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const checkRole = (role) => (req, res, next) => {
    if (req.user.scope !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

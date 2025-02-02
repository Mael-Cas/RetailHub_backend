const User = require('../models/User')

const jwt = require('jsonwebtoken')

exports.Auth = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'TOKEN');
        const userId = decoded.id;
        const role = decoded.role;
        const shopId = decoded.shopId
        req.auth = {
            userId: userId,
            role: role,
            shopId: shopId,
        };

        next();
    }catch (error){
        res.status(403).send({error: error.message})
    }
}

exports.Permission = (resource, field, action) => async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).populate('roles');
        const organizationId = req.auth.shopId;

        if (!user || user.storeID.toString() !== organizationId.toString()) {
            return res.status(403).json({ message: 'Unauthorized access.' });
        }

        let isAuthorized = false;

        user.roles.forEach(role => {
            if (role.organizationId.toString() === organizationId.toString()) {
                role.permissions.forEach(perm => {
                    if (perm.resource === resource) {
                        const fieldPermission = perm.actions.find(a => a.field === field && a.permission === action);
                        if (fieldPermission) isAuthorized = true;
                    }
                });
            }
        });

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Insufficient permissions for this field.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

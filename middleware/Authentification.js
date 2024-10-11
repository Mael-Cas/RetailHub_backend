const jwt = require('jsonwebtoken')

exports.Auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'TOKEN');
        const userId = decoded.id;
        const role = decoded.roles;

        req.auth = {
            userId: userId,
            role: role
        };

        next();
    }catch (error){
        res.status(403).send({error: error.message})
    }
}

exports.admin = (req, res, next) => {
    if (req.auth.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Accès interdit : Admin requis' });
    }
    next(); // Si l'utilisateur est admin, on passe au middleware suivant
};

// Middleware pour les routes utilisateur
exports.user = (req, res, next) => {
    if (req.auth.role !== 'USER' && req.auth.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Accès interdit : Utilisateur requis' });
    }
    next(); // Si l'utilisateur est user ou admin, on passe au middleware suivant
};
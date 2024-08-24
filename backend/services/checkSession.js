// Fonction de validation de la session, savoir si un utilisateur est connecté ou non (Status erreur 401)
const checkSession = async (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = checkSession;

// Session validation function, know if a user is connected or not (status error401)
const checkSession = async (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = checkSession;

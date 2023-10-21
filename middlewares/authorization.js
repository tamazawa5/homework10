
const authorization = (req, res, next) => {
    const { role } = req.userData;
    if (role == "Supervisor") {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden! you dont have permission to access this resource' });
    }
}

module.exports = authorization;
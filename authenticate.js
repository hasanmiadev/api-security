const jwt = require("jsonwebtoken");


function authenticate(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }
    try {
        token = token.split(' ')[1];
        const user = jwt.verify(token, "HASANK")
        req.user = user
        next()
    } catch (err) {
        return res.status(400).json({ message: "Invalid token" })
    }
}

module.exports = authenticate;
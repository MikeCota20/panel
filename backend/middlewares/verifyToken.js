import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("No access.");

    jwt.verify(token, "secret_key", (err, user) => {
        if (err) return res.status(403).send("Valid Token.");
        req.user = user;
        next();
    });
};

export default verifyToken;

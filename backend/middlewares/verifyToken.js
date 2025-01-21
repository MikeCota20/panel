import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Authorization Header:", req.headers.authorization);  // Para depurar el encabezado

    if (!token) {
        return res.status(401).send("No token provided.");
    }

    jwt.verify(token, "secret_key", (err, user) => {
        if (err) {
            console.log("JWT Error:", err);  // Muestra el error de JWT
            return res.status(403).send("Invalid token.");
        }

        req.user = user;
        next();
    });
};

export default verifyToken;

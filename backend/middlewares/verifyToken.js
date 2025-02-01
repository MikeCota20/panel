import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    // Depuración para mostrar el valor del header de autorización
    console.log("Authorization Header:", req.headers.authorization);  // Para depurar el encabezado

    if (!token) {
        return res.status(401).send("No token provided.");
    }

    // Intentar verificar el token
    jwt.verify(token, "secret_key", (err, user) => {
        if (err) {
            // Mejorar la depuración: muestra el error JWT
            console.log("JWT Error:", err);
            return res.status(403).send("Invalid token.");
        }

        // Si el token es válido, almacenamos los datos del usuario
        req.user = user;
        next();
    });
};

export default verifyToken;

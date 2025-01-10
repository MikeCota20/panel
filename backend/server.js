import express from "express"; // ¡No olvides esto!
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import protectedRoutes from "./routes/protectedRoutes.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/api", protectedRoutes);

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "panelview",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Successful connection to the database.");
});

// Ruta para registrar usuarios
app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, passwordHash], (err, result) => {
        if (err) return res.status(500).send("Error during registration.");
        res.status(201).send("User registered successfully.");
    });
});

// Ruta para login de usuarios
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).send("Error when searching for user.");
        if (results.length === 0) return res.status(404).send("User not found.");

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(401).send("Incorrect credentials.");

        const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1000h" });
        res.status(200).json({ token });
    });
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

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

app.get('/api/titles', (req, res) => {
    const { id } = req.query; // Obtén el ID desde los parámetros de la solicitud

    // Si hay un ID, devuelve un solo cómic
    if (id) {
        const query = 'SELECT * FROM mangas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else if (results.length === 0) {
                res.status(404).send({ message: 'Title not found' });
            } else {
                res.json(results[0]); // Devuelve el cómic encontrado
            }
        });
    } else {
        // Si no hay ID, devuelve todos los cómics
        const query = 'SELECT * FROM mangas';
        db.query(query, (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results);
            }
        });
    }
});

app.get('/api/mangas', async (req, res) => {
    try {
        const query = "SELECT * FROM mangas WHERE kind = 'manga'"; // Asegúrate que el valor 'manga' sea correcto
        db.query(query, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error when obtaining mangas...' });
            } else {
                res.json(results); // Devuelve todos los registros
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error when obtaining mangas...' });
    }
});



// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

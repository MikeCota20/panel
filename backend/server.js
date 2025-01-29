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


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send("Access denied.");
    
    try {
        const decoded = jwt.verify(token.split(' ')[1], "secret_key");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Invalid token.");
    }
};


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

app.get('/api/chapters', (req, res) => {
    const { manga_id } = req.query; // Obtén el manga_id desde los parámetros de la solicitud

    // Si hay un manga_id, devuelve todos los capítulos relacionados
    if (manga_id) {
        const query = 'SELECT * FROM manga_chapters WHERE manga_id = ?';
        db.query(query, [manga_id], (err, results) => {
            if (err) {
                res.status(500).send({ message: 'Error when obtaining chapters' });
            } else if (results.length === 0) {
                res.status(404).send({ message: 'No chapters found for this manga' });
            } else {
                res.json(results); // Devuelve los capítulos encontrados
            }
        });
    } else {
        res.status(400).send({ message: 'Missing manga_id parameter' });
    }
});

app.get('/api/chapters/:id/pages', (req, res) => {
    const chapterId = req.params.id;
    const query = 'SELECT * FROM manga_chapters_pages WHERE chapter_id = ?';

    db.query(query, [chapterId], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error obtaining pages.' });
        } else {
            res.json(results); // Devuelve las páginas del capítulo
        }
    });
});

app.get('/api/chapters/:id/comments', (req, res) => {
    const { id } = req.params;
    const query = `SELECT c.content, c.date, u.username 
                   FROM comments c 
                   INNER JOIN users u ON c.user_id = u.id 
                   WHERE c.chapter_id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ message: "Error retrieving comments." });

        // Formatear fechas antes de enviar al frontend
        const formattedResults = results.map(comment => ({
            ...comment,
            created_at: new Date(comment.date).toISOString()
        }));

        res.json(formattedResults);
    });
});

app.post('/api/chapters/:id/comments', verifyToken, (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;
    
    const query = 'INSERT INTO comments (chapter_id, user_id, content) VALUES (?, ?, ?)';
    db.query(query, [id, user_id, content], (err) => {
        if (err) return res.status(500).send("Error adding comment.");
        res.status(201).send("Comment added successfully.");
    });
});

app.get('/api/chapters/:id', (request, response) => {
    const { id } = request.params;

    const sqlQuery = `
        SELECT manga_chapters.chapter_title AS chapter_title, mangas.title AS manga_title
        FROM manga_chapters
        INNER JOIN mangas ON manga_chapters.manga_id = mangas.id
        WHERE manga_chapters.id = ?`;

    db.query(sqlQuery, [id], (error, results) => {
        if (error) {
            response.status(500).json({ message: 'Error retrieving chapter information.' });
        } else if (results.length === 0) {
            response.status(404).json({ message: 'Chapter not found.' });
        } else {
            response.json(results[0]); // Devuelve el título del capítulo y del manga
        }
    });
});




// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

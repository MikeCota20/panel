import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/protected-route", verifyToken, (req, res) => {
    res.status(200).send(`Bienvenido, usuario con ID: ${req.user.id}`);
});

export default router;

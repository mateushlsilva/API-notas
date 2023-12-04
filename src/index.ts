import express from "express";
import * as dotenv from "dotenv";


dotenv.config();

// cria o servidor e coloca na variável app
const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
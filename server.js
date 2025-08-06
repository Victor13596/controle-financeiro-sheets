import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './backend/api/sheets.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir frontend da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Usar porta definida pela Render
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
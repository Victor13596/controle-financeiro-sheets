import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './backend/api/sheets.js'; // importa sua API e a mantém rodando

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Se tiver frontend, servir a pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

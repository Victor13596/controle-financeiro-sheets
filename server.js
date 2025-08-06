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

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Porta ${PORT} já está em uso. Finalize o processo anterior ou altere a porta.`);
    process.exit(1);
  } else {
    console.error('Erro no servidor:', err);
  }
});

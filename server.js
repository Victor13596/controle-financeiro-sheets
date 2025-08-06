import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './backend/api/sheets.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pega a porta do ambiente ou usa 3000 localmente
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Porta ${PORT} já está em uso.`);
    process.exit(1);
  } else {
    console.error('Erro no servidor:', err);
  }
});
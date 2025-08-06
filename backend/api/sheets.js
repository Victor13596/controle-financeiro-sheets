import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir o frontend

// Config Google Sheets
const SPREADSHEET_ID = '1Znjx6lONc29O1Kkh_NOUa8Chg-NZWs9G8_xde8rIv24';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

// Rota GET para ler dados
app.get('/api/sheets', async (req, res) => {
  try {
    const sheetName = req.query.sheetName || 'Lançamentos';
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A2:E`,
    });

    const rows = response.data.values || [];
    const data = rows.map(r => ({
      tipo: r[0],
      categoria: r[1],
      valor: parseFloat(r[2]) || null,
      data: r[3],
      observacao: r[4] || ''
    }));

    res.json(data);
  } catch (error) {
    console.error('Erro ao ler do Google Sheets', error);
    res.status(500).send('Erro ao ler dados');
  }
});

// Rota POST para adicionar dados
app.post('/api/sheets', async (req, res) => {
  try {
    const { tipo, categoria, valor, data, observacao, sheetName } = req.body;
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName || 'Lançamentos'}!A:E`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[tipo, categoria, valor, data, observacao || '']]
      }
    });

    res.status(200).send('Lançamento adicionado com sucesso');
  } catch (error) {
    console.error('Erro ao salvar no Google Sheets', error);
    res.status(500).send('Erro ao salvar dados');
  }
});

// Rota para o frontend (index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Porta do Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

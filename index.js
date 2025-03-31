const express = require('express');
const bodyParser = require('body-parser');
const riotAuth = require('./riotAuth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// ✅ Route de test pour vérifier que le backend est up
app.get('/', (req, res) => {
  res.send('✅ Backend Valorant opérationnel sur Render');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const session = await riotAuth(username, password);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Échec de l’authentification Riot.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
});

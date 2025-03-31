const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { riotLogin } = require('./riotAuth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const session = await riotLogin(username, password);
    res.json(session);
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(401).json({ error: 'Erreur de connexion Riot' });
  }
});

app.listen(3001, () => {
  console.log('✅ Serveur backend lancé sur http://localhost:3001');
});

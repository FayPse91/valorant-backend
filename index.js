const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend Valorant opérationnel sur Render");
});

// Nouvelle route pour obtenir le lien d'auth Riot
app.get("/auth/link", (req, res) => {
  const redirectUri = process.env.REDIRECT_URI;
  const authUrl = `https://auth.riotgames.com/authorize?client_id=riot-client&redirect_uri=${redirectUri}&response_type=token&scope=openid link`;
  res.json({ url: authUrl });
});

// (Tu peux plus tard ajouter une route /callback si tu gères un vrai token avec code exchange)
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur le port ${PORT}`);
});


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend Valorant opérationnel sur Render");
});

// Utilise le port fourni par Render, ou 10000 en local
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur le port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/redirect', (req, res) => {
  const code = req.query.code;
  res.send(`Code reçu : ${code}`);
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur le port ${PORT}`);
});


// IGUANABOT - Sistema de Validação Automática
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Lista temporária de IDs autorizados (pode ser salva em banco depois)
let allowedIDs = ["12345678", "85311496"]; // exemplo

// 🔹 Endpoint: verificação do ID (usado pelo MT4)
app.get("/check/:id", (req, res) => {
  const id = req.params.id;
  if (allowedIDs.includes(id)) {
    res.json({ authorized: true });
  } else {
    res.json({ authorized: false });
  }
});

// 🔹 Endpoint: adicionar novo ID (usado pelo webhook da Kiwify)
app.post("/add-id", (req, res) => {
  const { id } = req.body;
  if (id && !allowedIDs.includes(id)) {
    allowedIDs.push(id);
    console.log("✅ Novo ID autorizado:", id);
    return res.json({ success: true });
  }
  res.json({ success: false });
});

app.listen(PORT, () => console.log(`🚀 IGUANABOT API rodando na porta ${PORT}`));

// Importa o Express
import express from "express";

// Cria o app Express
const app = express();

// Define a porta do servidor
const PORT = 3000;

// Rota principal "/"
app.get("/", (req, res) => {
  res.send({
    message: "Servidor em Execução",
    success: true
  });
});

// Rota "/equipe"
app.get("/equipe", (req, res) => {
  res.send([
    { nome: "Fulano", curso: "TI" },
    { nome: "Beltrano", curso: "TI" },
    { nome: "Ciclano", curso: "TI" }
  ]);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
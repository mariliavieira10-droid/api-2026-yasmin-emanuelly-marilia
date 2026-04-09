import { listaDeLivros } from "./fake_data.js";
import express from "express";

const app = express();
app.use(express.json());

console.log(listaDeLivros); 


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Servidor em Execução",
    success: true
  });
});


app.get("/api/livros", (req, res) => {
  try {
    if (!listaDeLivros || listaDeLivros.length === 0) {
      return res.status(404).json({
        message: "Nenhum livro encontrado"
      });
    }

    res.status(200).json(listaDeLivros);
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message
    });
  }
});

app.get("/api/livros/:livroId", (req, res) => {
  try {
    const livroId = Number(req.params.livroId);

    if (isNaN(livroId)) {
      return res.status(400).json({
        message: "ID inválido!"
      });
    }

    const livro = listaDeLivros.find((livro) => livro.id === livroId);

    if (!livro) {
      return res.status(404).json({
        message: "Livro não encontrado!"
      });
    }

    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message
    });
  }
});

app.post("/api/livros", (req, res) => {
  try {
    const { titulo, ano, disponivel, exemplares } = req.body;

    const novoLivro = {
      id: listaDeLivros.length + 1,
      titulo,
      ano,
      disponivel,
      exemplares,
    };

    listaDeLivros.push(novoLivro);

    return res.status(201).json({
      message: "Novo livro cadastrado!",
      livro: novoLivro,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
});


app.put("/api/livros/:livroId", (req, res) => {
  try {
    const livroId = Number(req.params.livroId);
    const { titulo, ano, disponivel, exemplares } = req.body;

    const livroIndex = listaDeLivros.findIndex((livro) => livro.id === livroId);

    if (livroIndex === -1) {
      return res.status(404).json({
        message: "Livro não encontrado!",
      });
    }

    listaDeLivros[livroIndex] = {
      id: livroId,
      titulo,
      ano,
      disponivel,
      exemplares,
    };

    return res.status(200).json({
      message: "Livro atualizado!",
      livro: listaDeLivros[livroIndex],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
});

app.patch("/api/livros/:livroId", (req, res) => {
  try {
    const livroId = Number(req.params.livroId);
    const { titulo, ano, disponivel, exemplares } = req.body;

    const livroIndex = listaDeLivros.findIndex((livro) => livro.id === livroId);

    if (livroIndex === -1) {
      return res.status(404).json({
        message: "Livro não encontrado!",
      });
    }

    if (titulo !== undefined) listaDeLivros[livroIndex].titulo = titulo;
    if (ano !== undefined) listaDeLivros[livroIndex].ano = ano;
    if (disponivel !== undefined) listaDeLivros[livroIndex].disponivel = disponivel;
    if (exemplares !== undefined) listaDeLivros[livroIndex].exemplares = exemplares;

    return res.status(200).json({
      message: "Livro atualizado!",
      livro: listaDeLivros[livroIndex],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
});

// DELETE - Remover livro
app.delete("/api/livros/:livroId", (req, res) => {
  try {
    const livroId = Number(req.params.livroId);

    const livroIndex = listaDeLivros.findIndex((livro) => livro.id === livroId);

    if (livroIndex === -1) {
      return res.status(404).json({
        message: "Livro não encontrado!",
      });
    }

    const [deletedLivro] = listaDeLivros.splice(livroIndex, 1);

    return res.status(200).json({
      message: "Livro deletado!",
      livro: deletedLivro,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
});


app.get("/equipe", (req, res) => {
  res.status(200).json([
    { nome: "Yasmin", curso: "TI" },
    { nome: "Emanuelly", curso: "TI" },
    { nome: "Marilia", curso: "TI" }
  ]);
});

// Rotas individuais
app.get("/yasmin-emanuelly-marilia/marilia", (req, res) => {
  res.status(200).json({
    nome: "Marília",
    matricula: "20251131000302",
    info: "Amo o Corinthians"
  });
});

app.get("/yasmin-emanuelly-marilia/emanuelly", (req, res) => {
  res.status(200).json({
    nome: "Emanuelly",
    matricula: "20251131000256",
    info: "Amo o Ceará Sport Club"
  });
});

app.get("/yasmin-emanuelly-marilia/yasmin", (req, res) => {
  res.status(200).json({
    nome: "Yasmin",
    matricula: "20251131000272",
    info: "Eu gosto de ler"
  });
});

app.listen(process.env.PORT || 3000, () => {
console.log("Server running on localhost:3000");
});
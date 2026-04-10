import { listaDeLivros } from "./fake_data.js";
import express from "express";

const app = express();
app.use(express.json());

// 📚 Lista de editoras
const listaDeEditoras = [
  { id: 1, nome: "Companhia das Letras", cnpj: "00.000.000/0001-01" },
  { id: 2, nome: "Editora Record", cnpj: "00.000.000/0001-02" },
  { id: 3, nome: "Rocco", cnpj: "00.000.000/0001-03" },
];

console.log(listaDeLivros);

// ================= HOME =================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Servidor em Execução",
    success: true
  });
});

// ================= LIVROS =================
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

// ================= EDITORAS =================

// GET todas editoras
app.get("/api/editoras", (req, res) => {
  res.status(200).json(listaDeEditoras);
});

// GET editora por ID
app.get("/api/editoras/:id", (req, res) => {
  const id = Number(req.params.id);

  const editora = listaDeEditoras.find(e => e.id === id);

  if (!editora) {
    return res.status(404).json({ message: "Editora não encontrada!" });
  }

  res.status(200).json(editora);
});

// POST nova editora
app.post("/api/editoras", (req, res) => {
  const { nome, cnpj } = req.body;

  const novaEditora = {
    id: listaDeEditoras.length + 1,
    nome,
    cnpj
  };

  listaDeEditoras.push(novaEditora);

  res.status(201).json({
    message: "Editora criada!",
    editora: novaEditora
  });
});

// PUT atualizar editora
app.put("/api/editoras/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nome, cnpj } = req.body;

  const index = listaDeEditoras.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Editora não encontrada!" });
  }

  listaDeEditoras[index] = { id, nome, cnpj };

  res.status(200).json({
    message: "Editora atualizada!",
    editora: listaDeEditoras[index]
  });
});

// PATCH atualizar parcialmente
app.patch("/api/editoras/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nome, cnpj } = req.body;

  const editora = listaDeEditoras.find(e => e.id === id);

  if (!editora) {
    return res.status(404).json({ message: "Editora não encontrada!" });
  }

  if (nome !== undefined) editora.nome = nome;
  if (cnpj !== undefined) editora.cnpj = cnpj;

  res.status(200).json({
    message: "Editora atualizada!",
    editora
  });
});

// DELETE remover editora
app.delete("/api/editoras/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = listaDeEditoras.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Editora não encontrada!" });
  }

  const removida = listaDeEditoras.splice(index, 1);

  res.status(200).json({
    message: "Editora removida!",
    editora: removida[0]
  });
});

// ================= EQUIPE =================
app.get("/equipe", (req, res) => {
  res.status(200).json([
    { nome: "Yasmin", curso: "TI" },
    { nome: "Emanuelly", curso: "TI" },
    { nome: "Marilia", curso: "TI" }
  ]);
});

// ================= SERVER =================
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on localhost:3000");
});
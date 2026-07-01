const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let personagens = [];
let proximoID = 1;

app.post('/personagem', (req, res) => {
  const { nome, level, classe, jogador, habilidades } = req.body;
  const novoPersonagem = { id: proximoID++, nome, level, classe, jogador, habilidades };
  personagens.push(novoPersonagem);
  res.status(201).json(novoPersonagem);
});

app.get('/personagem', (req, res) => {
  res.json(personagens);
});

app.get('/personagem/:id', (req, res) => {
  const personagem = personagens.find(p => p.id === parseInt(req.params.id));
  if (!personagem) return res.status(404).json({ message: 'Personagem não encontrado' });
  res.json(personagem);
});

app.get('/personagem/jogador/:jogador', (req, res) => {
  const personagensDoJogador = personagens.filter(p => p.jogador === req.params.jogador);
  if (personagensDoJogador.length === 0) return res.status(404).json({ message: 'Jogador não encontrado' });
  res.json(personagensDoJogador);
});

app.get('/personagem/classe/:classe', (req, res) => {
  const personagensDaClasse = personagens.filter(p => p.classe === req.params.classe);
  if (personagensDaClasse.length === 0) return res.status(404).json({ message: 'Classe não encontrada' });
  res.json(personagensDaClasse);
});

app.get('/personagem/nome/:nome', (req, res) => {
  const personagem = personagens.find(p => p.nome === req.params.nome);
  if (!personagem) return res.status(404).json({ message: 'Personagem não encontrado' });
  res.json(personagem);
});

app.put('/personagem/:id', (req, res) => {
  const personagem = personagens.find(p => p.id === parseInt(req.params.id));
  if (!personagem) return res.status(404).json({ message: 'Personagem não encontrado' });

  const { nome, level, classe, jogador, habilidades } = req.body;
  personagem.nome = nome || personagem.nome;
  personagem.level = level || personagem.level;
  personagem.classe = classe || personagem.classe;
  personagem.jogador = jogador || personagem.jogador;
  personagem.habilidades = habilidades || personagem.habilidades

  res.json(personagem);
});

app.delete('/personagem/:id', (req, res) => {
  const index = personagens.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Personagem não encontrado' });

  personagens.splice(index, 1);
  res.json({ message: 'Personagem deletado com sucesso' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
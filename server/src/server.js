const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PetAmigo API rodando na porta ${PORT}`);
  console.log(`http://localhost:${PORT}/api/health`);
});

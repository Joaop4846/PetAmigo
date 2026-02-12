const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/clienteRoutes');
const petRoutes = require('./routes/petRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/clientes', clienteRoutes);
app.use('/api/pets', petRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

module.exports = app;

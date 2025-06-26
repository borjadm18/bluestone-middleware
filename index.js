const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/update-product', async (req, res) => {
  const { productId, updates } = req.body;

  if (!productId || !updates) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const response = await axios.put(
      `https://<TU-URL-MAPI>/products/${productId}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${process.env.MAPI_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ status: 'OK', bluestoneResponse: response.data });
  } catch (err) {
    res.status(500).json({ error: 'Error al enviar a Bluestone', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Middleware Bluestone escuchando en ${PORT}`));

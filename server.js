const express = require('express');
const yfinance = require('yfinance');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/price/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const data = await yfinance.getQuote(name);
    if (!data || !data.regularMarketPrice) {
      res.status(400).send({ error: 'Bad stock name!' });
    } else {
      res.send({ price: data.regularMarketPrice });
    }
  } catch (error) {
    res.status(500).send({ error: 'Can’t get price!' });
  }
});

app.listen(3000, () => console.log('Robot is ready at http://localhost:3000'));
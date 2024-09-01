const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');
const app = express();
const port = 3000;

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

app.use(express.json());

const whitelist = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('hoho this api does not use for you'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola desde mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
});

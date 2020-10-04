require('dotenv').config();

const app = require('express')();
const { PORT } = require('./config');
const loadMiddlewares = require('./middlewares/loadMiddlewares');
const errorHandler = require('./middlewares/errorHandler');

loadMiddlewares(app);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

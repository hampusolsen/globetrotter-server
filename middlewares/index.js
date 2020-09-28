const cors = require('cors');

export default function loadMiddlewares(app) {
  app.use(
    cors({
      origin: 'http://localhost:3000/',
      credentials: true,
    })
  );
}

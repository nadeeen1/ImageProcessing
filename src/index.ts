import routes from './routes/images';

import express, { Application } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = 3000;
app.use(morgan('dev'));

app.use(routes);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;

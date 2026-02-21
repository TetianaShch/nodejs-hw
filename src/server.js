import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(cors());


app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:notesId', (req, res) => {
  const { notesId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${notesId}`,
  });
});


app.use(notFoundHandler);

app.use(errorHandler);


app.listen(PORT, () => console.log(`Server started on ${PORT}`));

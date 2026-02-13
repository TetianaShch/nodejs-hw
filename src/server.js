import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  })
);


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


app.listen(PORT, () => console.log(`Server started on ${PORT}`));

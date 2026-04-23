import express from 'express';
import cors from 'cors';
import quoteRoutes from './routes/quote';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/quote', quoteRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
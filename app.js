import express from 'express';
import { fileURLToPath } from 'node:url';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();

app.use(express.json());
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.use(express.static(fileURLToPath(new URL('../frontend/', import.meta.url))));
app.listen(3000, '127.0.0.1', () => {
  console.log('Buka http://localhost:3000');
});

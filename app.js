import express from 'express';
import { fileURLToPath } from 'node:url';
import productRoutes from './routes/productRoutes.js';

const app = express();
// SUDAH DISEDIAKAN — agar Controller dapat membaca body JSON.
app.use(express.json());
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/products', productRoutes);
// Folder tetap terpisah; browser dan API memakai alamat localhost yang sama.
app.use(express.static(fileURLToPath(new URL('../frontend/', import.meta.url))));
app.listen(3000, '127.0.0.1', () => {
  console.log('Buka http://localhost:3000');
});

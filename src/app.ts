import express from 'express';
import dotenv from 'dotenv';
import categoryRoutes from './routes/categoryRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/categories', categoryRoutes)
app.use('/api/posts', postRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server Standing!!!')      
})
import express from 'express';
import dotenv from 'dotenv';
import { Console } from 'console';

dotenv.config();

const app = express();
app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
    console.log('Server Standing!!!')      
})
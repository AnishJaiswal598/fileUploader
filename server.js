import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan(':method :url :status :response-time ms'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

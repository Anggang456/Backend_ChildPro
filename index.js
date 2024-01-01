import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import router from "./routes/index.js";
import cors from "cors";


dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log('Database connected...');
} catch(error){
  console.error(error);
}

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React app's origin
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(3000, ()=> console.log('Server running at port 3000'));
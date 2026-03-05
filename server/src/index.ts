import express from 'express';
import dotenv from "dotenv";
import { route } from './routes.ts';
import cookieParser from "cookie-parser"
const app = express();

// Oublie
app.use(express.json());
app.use(cookieParser());

app.use(route);

dotenv.config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`Server running on port : ${port}`)
});



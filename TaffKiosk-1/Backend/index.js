import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/router.js';
// import loginRouter from './routes/login.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:4200/"],
//     credentials: true,
//   }) 
// );


app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', router);
 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

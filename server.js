import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan  from "morgan";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";

// config env 
dotenv.config();

// connecting to database
connectDB();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.send({message:'hey Welcome to Ecommer app '})
})

// routes
app.use('/api/v1/auth',authRouter)


// port 

const port = process.env.PORT || 8000;

// run listen

app.listen(port, () => {
	console.log(`serve is running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white);
})

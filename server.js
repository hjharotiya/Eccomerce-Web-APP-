import express from "express";
import colors from "colors";
import dotenv from 'dotenv';

// config env 
dotenv.config();

// rest object
const app = express();

app.get('/', (req, res) => {
	res.send({message:'hey Welcome to Ecommer app '})
})


// port 

const port = process.env.PORT || 8000;

// run listen

app.listen(port, () => {
	console.log(`serve is running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white);
})

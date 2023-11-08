const express = require('express');

// rest object
const app = express();

app.get('/', (req, res) => {
	res.send({message:'hey Welcome to Ecommer app '})
})


// port 

const port = 8000;

// run listen

app.listen(port, () => {
	console.log(`serve is running on ${port}`);
})

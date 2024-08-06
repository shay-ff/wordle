const express = require('express');
const path = require('path');
const wordList = require('./5-letter-words.json');
const bodyParser = require("body-parser"); 
const router= express.Router();

const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));
router.use(bodyParser.json());

// Endpoint to get a random word
app.get('/random-word', (req, res) => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    res.json({ word });
});

app.get('/check-word',(req,res) => {
    const inputWord = req?.query?.input;
    const index = wordList.includes(inputWord);

    if(index){
        res.json({isValid: true});
        return;
    }

    res.json({isValid: false});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

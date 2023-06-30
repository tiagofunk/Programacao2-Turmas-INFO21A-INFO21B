const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(
    fileUpload({
        limits: {
            fileSize: 1000000, // Around 1MB
        },
        abortOnLimit: true,
    })
);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/upload/img/', (req, res) => {
    const image = req.files.file
    console.log(image)
    image.mv(__dirname + '/upload/img/' + image.name);
    res.sendStatus(200)
});
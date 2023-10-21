const express = require('express');
const app = express();
const router = require('./routes/index.js');
const path = require('path');

app.use(express.json());
app.use('/public/upload', express.static(path.join(__dirname + '/public/upload')));

app.use(router);

app.listen(3000, () => {
    console.log('Server running on port 3000...')
});
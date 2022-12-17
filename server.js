// use this for testing purposes
const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('./public'));

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port,() => {
    console.log(`listening on port ${port}`);
});
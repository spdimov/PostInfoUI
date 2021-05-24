//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory

app.get('*', (req, res) =>
    res.sendFile('app.component.html', { root: path.join('/src',__dirname) }),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8082);
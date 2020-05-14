const path = require('path');
const express = require('express');
var cors = require('cors')
const port = process.env.PORT || 31415;
var morgan = require('morgan')
var app = express();

app.use(express.json());

app.use(cors());
app.options('*', cors());

app.use(morgan("dev"))
app.use(require('./routes/profile'));
app.use(require('./routes/tweet'));
app.use(require('./routes/feed'));




app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}.`);
  }
});
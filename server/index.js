const envFound = require('dotenv').config();
if (!envFound) {
  console.log('No .env file found');
  process.exit(0);
}

const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const historyApiFallback = require('connect-history-api-fallback');
const device = require('express-device');

// Routes
const emailRoutes = require('./routes/email');
 
const app = express();

app
  // Parse JSON
  .use(bodyParser.json())
  // Cors
  .use(cors())
  // Enable detect device
  .use(device.capture())
  // Enable routes
  .use('/api/email', emailRoutes)
  // Enable history API
  .use(historyApiFallback())

function startServer() {
  // Start the Express server
  if(process.env.MODE == 'development') {
    const http = require("http").createServer(app)

    http.listen(process.env.PORT);
  }

  if(process.env.MODE == 'production') {
    const fs = require("fs")

    const sslCerts = {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH)
    }

    const https = require("https").createServer(sslCerts, app)
  
    https.listen(process.env.PORT);
  }
}

startServer();
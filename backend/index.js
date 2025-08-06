const express = require('express');
const latex = require('node-latex');
const fs = require('fs').promises;
const { createReadStream } = require('fs');
const path = require('path');
const os = require('os');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


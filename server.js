const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use([cors(), morgan('dev'), express.json()])

app.use('/auth', require('./authRoutes'))
app.use('/', require('./appRoutes'))

app.use('/health', (_req, res)=> {
    res.status(200).json({status: "OK"})
})


mongoose.connect('mongodb://127.0.0.1:27017/api-security').then(()=> {
    app.listen(4000, () => {
        console.log('Server Listening on http://localhost:4000');
    });
    console.log("Database Connected");
})

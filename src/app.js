const express = require('express');
const cors = require('cors');


const app = express();
const locationRoutes = require('./routes/locationRoutes');

app.use(express.json());
app.use(cors());
app.use('/api/locations', locationRoutes);

app.get('/', (req,res)=> {
    res.send('Server is running');
})

module.exports = app;
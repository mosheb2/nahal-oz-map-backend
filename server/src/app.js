const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();
const locationRoutes = require('./routes/locationRoutes');
const auth = require('./utils/auth');

app.use(express.json());
app.use(cors());


app.use('/api/locations', locationRoutes);

app.use('/assets/dist/bo-client/*', auth);
app.use('/assets',express.static(path.join(__dirname, '../../public')));

app.get('/', (req,res)=> {
    res.send('Server is running!!!');
})

app.use((err, req, res, next) => {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
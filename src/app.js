const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model');
const contractRoutes = require('./routes/contractRoutes');
const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);
app.use('/contracts', contractRoutes);
app.all('*', (req,res) => { 
    res.status(500).json({'msg': 'Invalid API Route'}).end()
})

module.exports = app;

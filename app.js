const express = require('express');
require('./db/mongoose')
const players = require('./db/model')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');
app.use(express.static('./assets/'));
app.get('/',(req,res)=>{
    res.render('index');
})

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log('Server running on '+port));
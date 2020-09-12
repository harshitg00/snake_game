const express = require('express');
require('./db/mongoose')
const Players = require('./db/model')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');
app.use(express.static('./assets/'));
app.get('/',(req,res)=>{
    Players.find({}).sort({score:-1}).exec((err,data)=>{
        if(err) console.log(err)
        else{
            console.log(data);
        res.render('index',{
            players: data,
            lowestScore:10
        });
    }
    })
})
app.get('/data',(req,res)=>{
    Players.find({}).sort({score:-1}).exec((err,data)=>{
        if(err) console.log(err)
        else
        res.send(data);
    })
})
app.get('/submit/:name/:score',(req,res)=>{
    Players.find({}).sort({score:-1}).exec((err,data)=>{
        if(err) console.log(err)
        else {
            Players.deleteOne({"_id":data[14]._id})
            .then(()=>{
                console.log('Last Player Deleted')
            })
            .catch((err)=>console.log(err))
            Players.create({
                name:req.params.name,
                score:req.params.score
            })
        }
    })
    res.redirect('/');
})

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log('Server running on '+port));
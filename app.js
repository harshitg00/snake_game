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
        res.render('index',{
            players: data,
            lowestScore:data[data.length-1].score
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
    Players.findOne({"name":req.params.name})
    .then(data => {
        if(data){
            if(req.params.score>data.score){
                Players.findOneAndUpdate({"name":req.params.name},{"score":req.params.score},{new:true})
                .then(()=>console.log("Player Updated"))
                .catch((err)=>console.log(err));
            }
        } else {
            Players.create({
                name:req.params.name,
                score:req.params.score
            })
            Players.find({}).sort({score:-1}).exec((err,data)=>{
                if(err) console.log(err)
                else{
                    // if(data.length>15){
                        let index = data.length-1;
                        Players.deleteOne({"_id":data[index]._id})
                        .then(()=>{
                            console.log('Last Player Deleted');
                        })
                        .catch((err)=>console.log(err));
                    // }
                }
            })
        }
    })
    .catch(err => {console.error(`Failed to find document: ${err}`)});
})

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log('Server running on ' + port));

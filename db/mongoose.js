const mongoose = require('mongoose');
const URI= process.env.mongoURI || require('../config/keys').mongoURI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex:true,
    useUnifiedTopology: true}
    ,(err)=>{
    if(err) {
        console.log(err);
    } else {
        console.log('MongoDB Connected');
        console.log('Git and Github');
    }
})
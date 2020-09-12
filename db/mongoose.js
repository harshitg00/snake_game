const mongoose = require('mongoose');
const URI =  process.env.mongoURI || "mongodb+srv://harshit:harshit@cluster0.52paa.mongodb.net/SnakeGame?retryWrites=true&w=majority";
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
    }
})
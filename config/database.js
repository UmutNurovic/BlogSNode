const mongoose =require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
    {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false},
    ).then(()=>{
        console.log("connected to database");
    }).catch(()=>{
        console.log("Could not connect to database");
    });
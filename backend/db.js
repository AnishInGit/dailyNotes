const mongoose=require('mongoose')
 const connectToMongo=()=>{
   const mongoURI=  ('mongodb://127.0.0.1:27017/dailyNotes?directConnection=true');
   mongoose.connect( mongoURI,()=>{
        console.log("Connected to Mongo Successfully");
    })
} 

module.exports = connectToMongo;
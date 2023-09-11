const mongoose=require('mongoose')
uri="mongodb+srv://amirtanweer0:5lMI0nb6WKOhA2JJ@cluster0.ihoqucf.mongodb.net/amirtanweer0?retryWrites=true&w=majority"

const connectDB=()=>{

    mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("connected to mongoose")
    })
}
module.exports=connectDB
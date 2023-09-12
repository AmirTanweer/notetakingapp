const mongoose=require('mongoose')



const connectDB=(uri)=>{

    mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("connected to mongoose")
    })
}
module.exports=connectDB
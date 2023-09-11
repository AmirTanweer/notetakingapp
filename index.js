const express=require("express");
const app=express();
const PORT=process.env.PORT || 5000;
const connectDB=require('./db')
const auth=require('./routes/auth')

// 5lMI0nb6WKOhA2JJ

connectDB()

//middleware
app.use(express.json())

app.use('/api/auth',auth)

const start=()=>{
    app.listen(PORT,()=>{
        console.log(`Successfully connect to Port ${PORT}`)
    })
}

start();
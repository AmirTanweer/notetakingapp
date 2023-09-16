const express=require("express");
const app=express();
const PORT=process.env.PORT || 5000;
const connectDB=require('./db')
const auth=require('./routes/auth')
const notes=require('./routes/notes')
require('dotenv').config();

// 5lMI0nb6WKOhA2JJ

connectDB(process.env.MONGODB_URI)

//middleware
app.use(express.json())

//Authentication endpoint
app.use('/api/auth',auth)

//Notes endpoint
app.use('/api/detail',notes)


const start=()=>{
    app.listen(PORT,()=>{
        console.log(`Successfully connect to Port ${PORT}`)
    })
}

start();
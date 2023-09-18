const express = require("express")
const cors = require("cors")
const app  = express();
const {connection} = require("./db") 
require("dotenv").config();

const {recipeRouter} = require("./routes/recipeRoute")
const {authRouter} = require("./routes/authRoute")

app.use(cors())
app.use(express.json())
app.use("/recipe",recipeRouter)
app.use("/auth",authRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to Recipe Application")
})
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("server is running on port 4500")
    }
    catch(e){
        console.log(e)
    }
})

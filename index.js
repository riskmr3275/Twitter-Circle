const express=require("express")
const app=express()
const cookieParser=require("cookie-parser")
const requestRoutes=require("./routes/Sample")
const cors=require("cors")
const dotenv=require("dotenv")

dotenv.config()
const PORT=process.env.PORT||4000;


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))


 

app.use('/api/v1', requestRoutes); 

// def general routes
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running.............."
    })
})

app.listen(PORT,()=>console.log(`your server is started on port ${PORT}`))
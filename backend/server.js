import express from "express"
import cors from "cors"
import ResultRouter from "./routes/ResultRoute.js"
const app=express()
const port=4000

app.use(express.json())
app.use(cors())


app.use("/api/result",ResultRouter);

app.get("/",(req,res)=>{
   res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})
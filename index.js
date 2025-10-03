const express=require("express")
const cors=require("cors")
const connect=require("./config/db")
const userRouter = require("./routes/user.routes")
const employeeRouter = require("./routes/employee.router")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    try {
        res.status(200).send({"msg":"Welcome To Crud app Backend"})
    } catch (error) {
        res.status(400).send({"msg":"Something Went Wrong"})
    }
})
const Port=process.env.Port||8080
app.use("/",userRouter)

app.use("/api",employeeRouter)
app.listen(Port,async()=>{
    console.log("Server Connection to DB");
try {
    await connect
    console.log("Server Connected Port",`${Port}`);
} catch (error) {
console.log("Try Again");
}
});

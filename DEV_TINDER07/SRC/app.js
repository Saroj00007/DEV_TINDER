const express = require('express')

const app = express()

// request handler !!!
app.use("/" , ( req , res)=>{
    res.send("hello from the dashboard!!!!")
})

app.use("/admin" , (req , res)=>{
    res.send("hello from the admin pannel")
})


app.listen(3000 , ()=>{
    console.log("this is to confirm that server is waiting in 3000 port")
})
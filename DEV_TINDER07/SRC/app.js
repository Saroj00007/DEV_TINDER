const express = require('express')

const app = express()

// request handler !!!

app.use("/admin" , (req , res , next)=>{
    // res.send("hello from the admin pannel")
    console.log("hello from 1st request handler!!!!");
    next();
} , (request , response , next)=>{
  response.send("this is the respoonse from 2nd req handler")
}
)

app.get( "/saroj", (req, res ,next)=>{
   console.log("hello from 1s handler");
   next()
} , (req, res)=>{
    res.send("respond granted from 2nd")

})
  
app.get("/user/:userid/:name/:age" , (req , res)=>{
   console.log(req.query)
   console.log(req.params)
    res.send({name:"saroj" , age:20})
})
app.get("/*fly $/" , (req , res)=>{
   console.log(req.query)
   console.log(req.params)
    res.send({name:"saroj" , age:20})
})


app.use("/" , ( req , res)=>{
    console.log(req.query)
    res.send("hello from the dashboard!!!!")
})



app.listen(3000 , ()=>{
    console.log("this is to confirm that server is waiting in 3000 port")
})
const newbe_auth = (req , res , next)=>{
   console.log("we are in newbe page")
    // we are writing the auth code 

    const Tokens = "abc"
    const had_ascess = Tokens === "abc"

    if(had_ascess){
          next()
    }else{
        res.status(401).send("something went wrong")
    }

}

const admin_auth = (req , res , next)=>{
   console.log("we are in admin page")
    // we are writing the auth code 

    const Tokens = "abc"
    const had_ascess = Tokens === "abc"

    if(had_ascess){
           next()
    }else{
        res.status(401).send("something went wrong")
    }

}

module.exports = {
newbe_auth,
admin_auth
}
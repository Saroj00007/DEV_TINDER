
const validator = require("validator")

const validate = (req)=>{
     
    const {user_id , Fname , Lname ,email , password } = req.body;

    if(!(Fname || Lname)){
        throw new Error(`INVALID ERROR: ${Fname} ${Lname}`)
    }
    else if(!validator.isEmail(email)){
         throw new Error("INVALID email : " + email)
    }else if (!validator.isStrongPassword(password)){
         throw new Error("INVALID PASSWORD : " + password)
    }
}

module.exports = validate
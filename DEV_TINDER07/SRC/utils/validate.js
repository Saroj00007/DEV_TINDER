
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

const validateProfileEdit = (req)=>{
  
  const user = req.body;
    const allowed_field = [
    "user_id",
      "Fname",
      "Lname",
      "age",
      "photo_url",
      "skills",
  ];


  const isAllowed = Object.keys(req.body).every((field)=>{
    return allowed_field.includes(field)
  });

//   if(!isAllowed){
//        throw new Error("UNABLE TO EDIT YOUR DATA! YOU CANNOT ASCESS OR EDIT THAT DATA!!")
//   }

return isAllowed;

}

module.exports = {validate , validateProfileEdit}
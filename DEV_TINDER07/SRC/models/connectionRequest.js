// this is the schema that stores the data of connection request

const mongoose = require('mongoose');

const connectionRequestSchmea = mongoose.Schema({
    fromUserid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    toUserid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'

    },
    status : {
        type : String ,
        enum:{
            values : ["intrested" , "ignored" , "accepted" , "rejected"],
            message : '{value} is not a valid status'
        }
    }
} , 
    {
    timestamps : true
});

connectionRequestSchmea.index({fromUserid : 1 , toUserid: -1})
// 1 and -1 are the symbol of ascending and descending order respectively .. 

connectionRequestSchmea.pre("save" , async function(nxt){
    const connection_request = this
   console.log(connection_request)
    if(connection_request.fromUserid.equals(connection_request.toUserid)){
        throw new Error("CANNOT SEND CONNECTINO REQUEST TO YOURSELF!!!")
    }

})

const connectionRequest = mongoose.model("connectionRequest" , connectionRequestSchmea);
module.exports = connectionRequest
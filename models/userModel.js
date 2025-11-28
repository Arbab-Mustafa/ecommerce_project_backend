import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A user must have a name']
    },
    email:{
        type:String,
        required:[true,'A user must have an email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'A user must have a password'],
    },
    cartData:{
        type:Object,
        default:{},
    },

    
},{
    minimize:false// mongoose doesnot show empty object, so cart data will be unavailable if empty, adding minimize false will make it available
})

const userModel=mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;
import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A product must have a name']
    },
    description:{
        type:String,
        required:[true,'A product must have a description']
    },
    price:{
        type:Number,
        required:[true,'A product must have a price']
    },
    image:{
        type:Array,
        required:[true,'A product must have at least one image image']
    },
     category:{
        type:String,
        required:[true,'A product must have a Category']
    },
     subCategory:{
        type:String,
        required:[true,'A product must have a subCategory']
    },
     sizes:{
        type:Array,
        required:[true,'A product must have sizes']
    },
    bestseller:{
        type: Boolean
    },
    date:{
        type:Number,
        required:[true,'A product must have a date']
    }
})

// use product model if it already exists else create it
const productModel=mongoose.models.product || mongoose.model('product',productSchema);

export default productModel;
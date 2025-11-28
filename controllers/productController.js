
import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
// files parsed using multer

// function for add product
const addProduct=async(req,res)=>{
    try {
        const {name,description,price,category,subCategory,  sizes,bestseller}=req.body;

        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]



        // we cant store images in db, for image we will store them in cloudinary and get cloud url- url stored in db
        const images=[image1,image2,image3,image4].filter((img)=>img!==undefined)

        let imagesUrl=await Promise.all(
            images.map(async (img)=>{
                // fetch secure url
                let result=await cloudinary.uploader.upload(img.path,{resource_type:'image'});

                return result.secure_url;

            })
        )
       

        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller:bestseller==='true'?true:false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()

        }
        console.log(productData);
        
        const product=new productModel(productData)
        await product.save()
        
        res.status(201).json({
            success:true,
            message:'Product Added'
        })
        
    } catch (error) {
        console.log(error);
        
         res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}
// function for list product
const listProducts=async(req,res)=>{
try {
     const products= await productModel.find();
         res.status(200).json({
            success:true,
            result:products.length,
            products
        })
} catch (error) {
      console.log(error);
        
         res.status(500).json({
            success:false,
            message:error.message
        })
}
}
// function for removing product
const removeProduct=async(req,res)=>{
try {
       await productModel.findByIdAndDelete(req.body.id);
         res.status(204).json({
            success:true,
            message:'Product deleted'
        })
} catch (error) {
      console.log(error);
        
         res.status(500).json({
            success:false,
            message:error.message
        })
}
}
// function for single product info
const singleProduct=async(req,res)=>{
try {
       const product=await productModel.findById(req.body.productId);
         res.status(200).json({
            success:true,
            product
        })
} catch (error) {
      console.log(error);
        
         res.status(500).json({
            success:false,
            message:error.message
        })
}
}

export {addProduct,listProducts,removeProduct,singleProduct}
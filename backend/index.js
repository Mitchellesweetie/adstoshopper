const express=require('express')
const cors=require('cors')
const path=require('path')
const multer=require('multer')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const mongoose=require('mongoose')
const port=process.env.port
const { type } = require('os')
const url=process.env.URL



const app=express()
app.use(cors())
app.use(express.json())
app.use('/images',express.static('upload'))

mongoose.connect("mongodb+srv://ngoli:test@cluster0.0u5nuwb.mongodb.net/e-commerce")
//mongodb+srv://ngoli:<password>@cluster0.0u5nuwb.mongodb.net/

app.get('/',(req,res)=>{
    res.send('hello shopper')

})
const Product=mongoose.model('Product',{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,

    },
    date:{
        type:Date,
        default:Date.now()
    },
    available:{
        type:Boolean,
        default:true,
    }
    
})
/*
app.delete('/',(req,res)=>{

})
*/
const engine=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload=multer({storage:engine})

app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http:localhost:3000/images/${req.file.fieldname}`
    })

})

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
     success:true,
     name:req.body.name
 })
      
 })
 app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({})
    console.log("all products")
    res.send(products)
 })
 
 app.post('/addproduct',async(req,res)=>{
     const user=await Product.find()
     let id
     if(user.length>0){
         let last_product=user.slice(-1)
         let lastproduct=last_product[0]
         id=lastproduct.id+1
     }
     else{
         id=1
     }
 
    const product=new Product({
        id:id,
        name:req.body.name,
        category:req.body.category,
        image:req.body.image,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    })
    console.log(product)
    await product.save()
    res.json({
        success:true,
        name:req.body.name,
    })
})













app.listen(process.env.port,(err)=>{
    if(!err){
        console.log(`server listening ${port}` )
    }
    else {
        console.log('stopped')
    }

})
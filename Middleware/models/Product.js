const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        default:4,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    }
})

module.exports = mongoose.model('Product',ProductSchema)
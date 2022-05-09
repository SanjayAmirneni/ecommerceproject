
const CheckoutProduct = require("../models/CheckoutProduct")


const addProduct = async (req,res) => {
    try{
    // console.log(req.body)
    // console.log(req.params)
    const product = await CheckoutProduct.create(req.body)
    if(product){
        res.status(200).json(product)
        }else{
            res.status(400).send("Internal Server Error");
        }}
        catch(error){
            res.send(error)
        }
}


const getProducts = async (req,res) => {
    const {createdBy} = req.query;
    // console.log(req)
    try{
        const products = await CheckoutProduct.find({createdBy:createdBy})
        if(products){
            // console.log(products)
            
            // console.log(toatlprice)
            res.status(200).json(products)
            
            }else{
                res.status(400).send("Internal Server Error");
            }
           
    } catch(error){
        res.send(error)
    }
}


// const productTotal = async (req,res) => {
//     const {createdBy} = req.query;
//     // console.log(req)
//     try{
//         const products = await CheckoutProduct.find({createdBy:createdBy})

//         if(products){
//             const toatlprice = products.reduce(reduce((price,ele)=>price+Number(ele.price),0))
//             res.status(200).json(toatlprice)
//             }else{
//                 res.status(400).send("Internal Server Error");
//             }
           
//     } catch(error){
//         res.send(error)
//     }
// }


const deleteProducts = async (req,res) => {
    const {createdBy,title} = req.body;
    // console.log(req.body)
    try{
        const products = await CheckoutProduct.findOneAndDelete(req.body)
        // console.log(products)
        if(products){
            res.status(200).json(products)
            }
           
    } catch(error){
        res.send(error)
    }
}

module.exports = {addProduct,getProducts,deleteProducts};
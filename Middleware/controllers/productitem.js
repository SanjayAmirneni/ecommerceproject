const Product = require('../models/Product')

const getProductItems = async (req,res) => {
    const category = req.query.category;
    // console.log(req)
    const queryObject = {};
    if(category){
        queryObject.category = category
    }
    try{
    const products = await Product.find(queryObject);
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



module.exports = getProductItems;
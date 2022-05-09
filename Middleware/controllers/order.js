// const express = require('express');
const OrderProduct = require('../models/OrderProduct');

const insertProducts = async (req,res) => {
    try{
    const product = await OrderProduct.create(req.body);
    if(product){
        res.status(200).json(product)
        }else{
            res.status(400).send("Internal Server Error");
        }}
        catch(error){
            res.send(error)
        }
}


const getOrderProducts =async (req,res) => {
    const {createdBy} = req.query;
    try{
        const products = await OrderProduct.find({createdBy:createdBy}).sort(-'createdDate')
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

module.exports = {insertProducts,getOrderProducts}
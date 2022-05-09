const User = require('../models/User');

const getCredentials = async (req,res) => {

    console.log(req.session)
    // console.log(res)
    const {mailID,password} = req.query
    try{

    const credentials = await User.find({mailID:mailID});
    if(credentials){
        // req.session.isAuth = true;
        req.session.username = mailID
        // console.log(req.session)
        console.log(res.req.session)
        res.status(200).send(credentials);
    }else{
        res.status(200).send("Wrong Credentials")
    }
    }catch(error){
        res.send(error)
    }
}


const addUser = async (req,res) => {
    try{
        // console.log(req.body)
        const user = await User.create(req.body)
        if(user){
        res.status(200).json(user)
        }else{
            res.status(400).send("Internal Server Error");
        }
    }catch(error){
        res.send(error)
    }
}

module.exports = {getCredentials,addUser}
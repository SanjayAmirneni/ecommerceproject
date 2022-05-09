const express = require("express");
const cors = require("cors");
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session);


// Initiating /////////////////////////////////////////////////////
const app = express();

const store = new MongoDBStore({
    uri:"mongodb+srv://sanjayamirneni:Test1234user@cluster0.qsxpf.mongodb.net/session?retryWrites=true&w=majority",
    collection: "mySessions",
  });


// Importing user functions ///////////////////////////////////////
const connectDB = require('./db/connet')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const payments = require('./routes/payment')
const orders = require('./routes/order')
const productitem = require('./routes/productitem')

// Config /////////////////////////////////////////////////////////
const Mongo_URI = "mongodb+srv://sanjayamirneni:Test1234user@cluster0.qsxpf.mongodb.net/Ecommerce?retryWrites=true&w=majority"
const port = 5000;

// middleware /////////////////////////////////////////////////////
app.use(express.json());

app.use(
    session({
        secret:"abc123",
        resave:false,
        saveUninitialized:false,
        cookie:{
            expires: 60 * 2,
            httpOnly:false,
        },
        store: store,
        
        
    })
);

app.use(cors())

app.use('/api/v1/user',userRouter);
app.use('/api/v1/products',productRouter);
app.use('/api/v1/payments',payments);
app.use('/api/v1/orders',orders);
app.use('/api/v1/productitem',productitem)



const start = async () => {
    try{
        await connectDB(Mongo_URI);
        app.listen(port);
    }
    catch(error){
        console.log(error);
    }
};

start();



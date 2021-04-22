const http = require('http')
const express = require('express')
const app = express();
const port =process.env.PORT || 3000
const server = http.createServer(app);
server.listen(port);
console.log("connected "+port)

const morgan = require('morgan');
const bodyParser =require('body-parser')
const mongoose =require('mongoose')

mongoose.connect('mongodb+srv://krinal:qSfgaDaAmB0sytjT@cluster0.jhzja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true,
  })
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//user route
const userRoute = require("./user/user.route");
app.use("/users", userRoute);

//product route
const productRoute = require("./product/product.route");
app.use("/products", productRoute);

//category route
const categoryRoute = require("./category/category.route");
app.use("/category", categoryRoute);

//wishlist route
const wishlistRoute = require("./whiteList/wishist.route");
app.use("/wishlist", wishlistRoute);

//Variant route
const VariantRoute = require("./variant/variant.route");
app.use("/variant", VariantRoute);

//Address route
const AddressRoute = require("./address/address.route");
app.use("/address", AddressRoute);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });


app.use((req ,res ,next) =>{
    const error =new Error('Not Found');
    error.stats(404)
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


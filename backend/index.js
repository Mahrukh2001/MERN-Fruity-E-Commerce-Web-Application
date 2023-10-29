const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')

const app = express()
app.use(cors())
app.use(express.json({ limit: "10mb" }));


const PORT = process.env.PORT || 8080
//mongodb connection
// console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log(err))

//Schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type : String,
        unique : true, 
    },
    password: String,
    confirmPassword: String,
    image : String,
})

//
const userModel = mongoose.model("user", userSchema)


//api
app.get("/",(req,res)=>{
    res.send("Server is running")

})

//api Signup
app.post("/signup",async(req,res)=>{
    // console.log(req.body)
    const {email} = req.body

    try {
        const result = await userModel.findOne({ email: email });
        if (result) {
          res.send({ message: "Email id is already registered",alert : false });
        } else {
          const data = userModel(req.body);
          const save = await data.save();
          res.send({ message: "Successfully Sign up", alert : true });
        }
      } catch (error) {
        // console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
      
})
//api login

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email: email });
  
      if (!user) {
        res.send({ message: "Email not found, Please Sign up", alert: false });
      } else {
        // Compare the entered password with the stored password
        if (user.password === password) {
          const dataSend = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
          };
          // console.log(dataSend);
          res.send({ message: "Login Successfully", alert: true, data: dataSend });
        } else {
          res.send({ message: "Invalid password", alert: false });
        }
      }
    } catch (error) {
      // console.error(error);
      res.status(500).send({ message: "Internal Server Error", alert: false });
    }
  });
  
  
//product section
const schemaProduct = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : String,
    description : String,

});
const productModel = mongoose.model("product", schemaProduct)

//save product in database
//api
app.post("/uploadProduct", async(req,res)=>{
  // console.log(req.body)
  const data =  await productModel(req.body)
  const datasave = await data.save()

  res.send({message : "Uploaded successfully"})

})

//Get product from database
app.get("/product", async(req,res)=>{
  // Wrap the database operations in a try/catch block
try {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
} catch (error) {
  // console.error(error);
  res.status(500).send({ message: "Internal Server Error", alert: false });
}


})

//Pyment gateway
// console.log(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.post("/checkout-payment",async(req,res)=>{
  // console.log(req.body)

  try{
  const params = {
    submit_type : 'pay',
    mode : "payment",
    payment_method_types : ['card'],
    billing_address_collection : "auto",
    shipping_options : [{shipping_rate : "shr_1O6SSECiJvNZqzS0Tgug10ZF"}],

    line_items : req.body.map((item)=>{
      return{
        price_data : {
          currency : "pkr",
          product_data : {
            name : item.name,
            // images : [item.image]
            
          },
          unit_amount : item.price * 100,
        },
       
        quantity : item.qty,
        adjustable_quantity:
         { 
          enabled: true,
          minimum: 1
         },
      }
    }),
    success_url : `${process.env.FRONTEND_URL}/success`,
    cancel_url :  `${process.env.FRONTEND_URL}/cancel`

  }

 const session = await stripe.checkout.sessions.create(params)
 res.status(200).json(session.id)
}
catch(err){
  res.status(err.statusCode || 500).json(err.message)

}

})

app.listen(PORT, ()=>console.log("server is running at port : " + PORT))
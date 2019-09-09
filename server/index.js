var express = require("express")
var body_parser = require("body-parser")
var cors = require("cors")
var app = express()
app.use(cors())
app.use(body_parser.json())

const mongo_client = require("mongodb").MongoClient
const object_id = require("mongodb").ObjectId

const url = "mongodb://localhost:27017"
const db_name ="bill_generator";
const client = new mongo_client(url)

let db;

client.connect(function(err){
    db=client.db(db_name);
    console.log("connected to server")
})

app.post("/add_food",function(req, res){
    db.collection("bill_generator").insertOne({food_name:req.body.name,price:req.body.price})
})

app.get("/food_details",(req ,res)=>{
    db.collection("bill_generator").find({}).toArray((err, response)=>{
        res.json({"food_details":response})
    })
})

app.get("/available_foods",(req, res)=>{
    db.collection("bill_generator").find({}).toArray((err, response)=>{
        res.json({"food_details":response})
    })
})

app.get('/show/:id', function (req, res) {
    const userId = req.params['id'];
    let ObjectId= require("mongodb").ObjectId
    const str = new ObjectId(userId)
    //const id = "ObjectId("+"+ str+"+")"
    console.log(str)
    db.collection("bill_generator").find({"_id":str}).toArray(function(err,response){
        res.json({"food_details":response})
    })
    
});

app.post("/edit/:id",function(req, res){
    const userId =req.params["id"]
    let ObjectId = require("mongodb").ObjectId
    let id = new ObjectId(userId)
    db.collection("bill_generator").updateOne({"_id":id},{$set:{"food_name":req.body.name,"price":req.body.price}},function(err,response){
        res.json({"food_details":response})
    })
})


app.get("/delete/:id",(req, res)=>{
    const userId =req.params["id"]
    let ObjectId = require("mongodb").ObjectId
    let id = new ObjectId(userId)
    db.collection("bill_generator").deleteOne({"_id":id},(err, response)=>{
        res.json({"food_details":response})
    })
})


app.listen(4000)
console.log("running")


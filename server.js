const express = require("express");
const cors = require("cors")
const app = express();
const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient;
const URL = "mongodb://localhost:27017";
const DB ="pramila"

let users = [];

// midleware
app.use(express.json())
app.use(cors({
    origin : "http://localhost:3000"
}))

app.get("/home", function(req,res) {
    res.json({message : "Success..."});
});

app.get("/about", function(req,res) {
    res.json({message : "About..."});
});

// POST Method
app.post("/user", async function(req, res) {
    try {
// Step 1: Create a connection between Nodejs and MongoDB
const connection = await mongoClient.connect(URL)
// Step 2: Select the DB
const db = connection.db(DB)
// Step 3: Select the collections
// Step 4: Do the operation(create, update, read, delete)
await db.collection("users").insertOne(req.body)
// Step 5: Close the connection
await connection.close()
res.json({message:"Data inserted"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
    // req.body.id = users.length +1;
    // users.push(req.body);
    // res.json({message : "User created successfully..."});
});

// GET Method
app.get("/users", async function(req, res){
//     let qParms = req.query
//     console.log(qParms);
    
//     let resUser = []
//     for(let index = parseInt(req.query.offset); index < parseInt(req.query.offset) + parseInt(req.query.limit); index++) 
//     {
//         if (users[index]){        
//             resUser.push(users[index]);
//     } 
// }
try {
    // Step 1: Create a connection between Nodejs and MongoDB
    const connection = await mongoClient.connect(URL)
    // Step 2: Select the DB
    const db = connection.db(DB)
    // Step 3: Select the collections
    // Step 4: Do the operation(create, update, read, delete)
    let resUser = await db.collection("users").find().toArray();
    // Step 5: Close the connection
    await connection.close()
    res.json(resUser)
        }
        catch(error){
            console.log(error)
            res.status(500).json({message:"Something went wrong"})
        }

});

// GET Particular Document
app.get("/user/:id", async function(req,res) {
    // let userId = req.params.id;
    // let user = users.find((item) => {
    //     return item.id == userId
    // })
    // if(user) {
    //     res.json(user)
    // }else{
    //     res.json({message:"User not found"});
    //     } 
    try {
        // Step 1: Create a connection between Nodejs and MongoDB
        const connection = await mongoClient.connect(URL)
        // Step 2: Select the DB
        const db = connection.db(DB)
        // Step 3: Select the collections
        // Step 4: Do the operation(create, update, read, delete)
        let user = await db.collection("users").findOne({_id: mongodb.ObjectId(req.params.id)});
        // Step 5: Close the connection
        await connection.close()
        res.json(user)
            }
            catch(error){
                console.log(error)
                res.status(500).json({message:"Something went wrong"})
            }
    });

    // PUT Method (Update)
app.put("/user/:id", async function(req,res) {
    // let userId = req.params.id;
    // let userIndex = users.findIndex((item) => item.id == userId);
    // if(userIndex != -1){
    //     Object.keys(req.body).forEach((item) => {
    //          users[userIndex][item] = req.body[item];
    //     });
    //     res.json({message:"Done"});
    //     }else{
    //         res.json({message:"User not found"});
    //       }
    try {
        // Step 1: Create a connection between Nodejs and MongoDB
        const connection = await mongoClient.connect(URL)
        // Step 2: Select the DB
        const db = connection.db(DB)
        // Step 3: Select the collections
        // Step 4: Do the operation(create, update, read, delete)
        let user = await db.collection("users").findOneAndUpdate({_id: mongodb.ObjectId(req.params.id)}, {$set:req.body});
        // Step 5: Close the connection
        await connection.close()
        res.json(user)
            }
            catch(error){
                console.log(error)
                res.status(500).json({message:"Something went wrong"})
            }

    });

app.delete("/user/:id", async function(req,res) {
// let userId = req.params.id;
// let userIndex = users.findIndex((item) => item.id == userId);
// if(userIndex != -1){
//     users.splice(userIndex,1);
//     res.json({message: "User Deleted"});
// }else{
//     res.json({message: "Users not found"});
// }
try {
    // Step 1: Create a connection between Nodejs and MongoDB
    const connection = await mongoClient.connect(URL)
    // Step 2: Select the DB
    const db = connection.db(DB)
    // Step 3: Select the collections
    // Step 4: Do the operation(create, update, read, delete)
    let user = await db.collection("users").findOneAndDelete({_id: mongodb.ObjectId(req.params.id)});
    // Step 5: Close the connection
    await connection.close()
    res.json(user)
        }
        catch(error){
            console.log(error)
            res.status(500).json({message:"Something went wrong"})
        }
});

// Query Parameter
app.get("/users", function(req, res) {
    let qParms = req.query
    console.log(qparms)

    let resUser = []
    for(let index = parseInt(req.query.offset); index < parseInt(req.query.offset) + parseInt(req.query.limit); index++) {
    resUser.push(users[index])
}
res.json(resUser);
});
        
app.listen(process.env.PORT || 3001);
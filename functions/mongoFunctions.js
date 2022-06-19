const axios = require('axios').default;
const moment = require('moment');
const { MongoClient, ObjectId } = require('mongodb');
var mysql = require('mysql');


async function handlerFunction({ make, newmake, newyear, newmodel, newkm }) {

    console.log("MAKEEEE:", make);

    const connectionToCar = await openConnectionwithMongo({ url: "mongodb+srv://paulatmg:Paula1512@paulatmg.atezy.mongodb.net/?retryWrites=true&w=majority", dbName: "paula", collectionName: "car" });
    const searchMake = await connectionToCar.find({ make }).toArray();

console.log("searchMake:", searchMake);


    if (searchMake.length === 0){
        await connectionToCar.insertMany([{make: newmake, year: newyear, model: newmodel, km: newkm}]);
       // return "YOUR CAR HAS BEEN ADDED IN OUR SYSTEM"
    }
    else {
        return searchMake;
    }
}

async function openConnectionwithMongo({ url, dbName, collectionName }) {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return db.collection(collectionName);
}


module.exports = {
    handlerFunction
}
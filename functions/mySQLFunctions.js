const axios = require('axios').default;
const moment = require('moment');
const { MongoClient, ObjectId } = require('mongodb');
var mysql = require('mysql');


async function handlerFunction({ make, newmake, newyear, newmodel, newkm }) {

    console.log("MAKEEEE:", make);

    const connection = await openConnection({ host: "ebh2y8tqym512wqs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com", user: "q2w01mu95z1r9p9x", password: "b3cthljmoxgfhpyt", database: "zgwqhx5rlwm7kj0u" });
    const selectbyMake = `SELECT * FROM motorcycle WHERE \`make\`  = "${make}"`;
    const motorcycleMake = await executeDBComandID({ query: selectbyMake, connection });

    console.log("motorcycleMake:", motorcycleMake);

    if (motorcycleMake.length === 0){
        
        const insertTo = `INSERT INTO motorcycle (\`make\`, \`model\`, \`year\`, \`km\`) VALUES ('${newmake}', '${newmodel}', '${newyear}', '${newkm}')`;
        
        await executeDBComandID({ query: insertTo, connection });

       return "YOUR CAR HAS BEEN ADDED IN OUR SYSTEM"
    }
    else {
        return motorcycleMake;
    }
}


async function openConnection({ host, user, password, database }) {
    var connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });

    connection.connect();
    return connection;
}

async function executeDBComandID({ query, connection }) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                return reject(error.message);
            }

            return resolve(results)
        })
    })
}




module.exports = {
    handlerFunction
}
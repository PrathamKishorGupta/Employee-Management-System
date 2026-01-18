import mysql from 'mysql'
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";



const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employeems",
    ssl: {
        ca: fs.readFileSync(process.env.CAcertify)
    }
})

con.connect(function(err) {
    if(err) {
        console.log("Connection Error:", err.message)
        console.log("Make sure MySQL server is running!")
    }
    else {
        console.log("Database Connected Successfully")
    }
})

export default con;


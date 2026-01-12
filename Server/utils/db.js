import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Divyansh@12",
    database: "employeems"
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
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mysql = require('mysql2')
require('dotenv').config();

const app = express()
app.use(cors())
app.use(bodyparser.json())

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

    db.connect((err)=>{
        if(err){
            console.error("Database connection failed");
            process.exit(1);
        }
        console.log("Mysql Connected Successfully");
    });

    app.post("/employee", (req, res) => {
        const { name, employeeId, email, phoneNumber, department, dateOfJoining, role } = req.body;
    
        if (!name || !employeeId || !email || !phoneNumber || !department || !dateOfJoining || !role) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        
        const query = "INSERT INTO employee (name, employeeId, email, phoneNumber, department, dateOfJoining, role) VALUES(?,?,?,?,?,?,?)";
    
        db.query(query, [name, employeeId, email, phoneNumber, department, dateOfJoining, role], (err, results) => {
            if (err) {
                console.error("Error occurred while processing:", err);
                return res.status(500).json({ message: "Error occurred while processing the data", error: err });
            }
    
            res.status(200).json({ message: "Details submitted successfully" });
        });
    });

    PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });

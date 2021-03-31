const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

//Used to parse application/json
app.use(express.json());

app.use(cors());

//Used to create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'instructorprofiledb'
});

//Used to confirm if database is connected
conn.connect((err) => {
    if(err) throw err;
    console.log('mysql Connected...');
});

//Show All Instructors
app.get('/instructors', (req, res) => {
    const sql = "SELECT *  FROM  instructor_table"
    conn.query(sql, (err, results) => {
        if(err) throw err;
        res.status(200).json(results);
    });
});

//Show single instructor
app.get('/instructors/:ID', (req, res) => {
    const sql = "SELECT *  FROM  instructor_table WHERE ID="+req.params.ID
    conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//Show all courses
app.get('/courses', (req, res) => {
    const sql = "SELECT *  FROM  course_table"
    conn.query(sql, (err, results) => {
        if(err) throw err;
        res.status(200).json(results);
    });
});

app.get('/courseinstructors/:ID', (req, res) => {
    const sql = "SELECT c.Course_Title, i.First_Name FROM  course_assign AS ca INNER JOIN instructor_table AS i ON i.ID = ca.instructor_id INNER JOIN course_table AS c ON c.ID = ca.course_id WHERE c.ID ="+req.params.ID
    conn.query(sql, (err, results) => {
        if(err) throw err;
        res.status(200).json(results);
    });
});

//Server Listening
app.listen(3001,() => {
    console.log('Server Started at port 3001');
})
import express from "express"
import path from "path"
import ejs from "ejs"
const app = express()
import router from "./routes/route.js"
import mysql from "mysql2"
import session from "express-session"
import cookieParser from "cookie-parser"
// import mySqlStore from "express-mysql-session"

app.use(cookieParser("hello"));
app.use(session({
    secret: "secret",
    resave:false,
    saveUninitialized:false,
    cookie: {
        sameSite:true,
        httpOnly: false,
        secure: false
    }
}))

app.set("view engine", "ejs")
app.use(express.static("./public"))
app.use("/", router)
app.use(express.json())
app.use(express.urlencoded({extended:true}))




const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"todolist",
    password:"Abiodun5!"
})
db.connect((err) => {
    if(err){
        console.log("error connecting to db")
        console.log(err)
    }
    else{
        console.log("database connected successfully")
    }
})
export default db

app.listen(5000, (req,res) => {
    console.log("server running on http://localhost:5000")
})
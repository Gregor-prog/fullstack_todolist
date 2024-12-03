import { error } from "console"
import express from "express"
import db from "../index.js"
import bcrypt from "bcryptjs"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


const pregister = (req,res) => {
    res.render('register.ejs', {message:null, success:null})
}

const uregister = async (req,res) => {
    const {username, email, password} = req.body
    if(password.length < 8){
        return res.status(404).render("register.ejs",{message:"Password Length must be greater than 8", success:""})
    }
    db.query(`SELECT username FROM users WHERE username = ?`,[username], (error, result) => {
        if(error){
            return res.status(404).json({message : "An error  occured"})
        }
        else{
           if(result.length = 0){
            console.log("result")
             res.status(200).json({message : "User already Exists"})
           }
        }
    })
    console.log(req.body)
    let hash = await bcrypt.hash(password,10)
    console.log(hash)
    let query = "INSERT INTO users(username, email,password_hash) VALUES(?,?,?)"
    db.query(query,[username,email,hash], (error, result) => {
        if(error){
            return res.json({"error": "could'nt register user"})
            console.log(error)
        }
        else{
            return res.render("register.ejs",{success: "user created successully", message:""})
        }
    })
}
export  {pregister, uregister}
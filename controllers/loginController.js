import { request } from "express";
import db from "../index.js"
import bcrypt from "bcryptjs"

// login controller
const plogin =  (req,res) => {
    res.render("login.ejs")
}
let user;
let id;
let status
let an = 0;

    // const {iusername, ipassword} = await req.body;
    // const query = `SELECT * FROM users WHERE username = ?`
    //     db.query(query,[iusername],(error,result) => {
    //     if(error){
    //         res.status(404).json({"message" : "An error occured, check password and username"})
    //         console.log(error)
    //     }
    //     const [{user_id,username,email,password}] = result
    
    //     if(ipassword == password){
    //              await res.redirect("/home")
    //     }
    //     else{
    //             res.status(404).json({"message":"error, password aint correct"})
    //     }
    
    const ulogin =  async (req,res) => {
        req.session.username = "bla"
        const {iusername, ipassword} = await req.body
        const query = `SELECT * FROM users WHERE username = ?`
        let results = await new Promise((resolve,reject) => {
            db.query(query,[iusername], (error,result) => {
                if(error){
                    console.log(error)
                    res.status(404).json({message:"An error occured"})
                }
                else{
                    resolve(result)
                }
            })
        })
        console.log(results)
        if(results.length == 0){
            console.log("User not found");
            return res.status(404).json({message:"User not found"})
        }
            
    const [{user_id,username,email,password_hash}] = results
        console.log(results)
    req.session.username = username
    req.session.user_id = user_id
    console.log(req.session)
    console.log(req.session.id)
    let compare = await bcrypt.compare(ipassword,password_hash)
    console.log(compare)
    if(await bcrypt.compare(ipassword,password_hash)){
        req.session.authorized = true
        res.redirect("/home")
        console.log("login successful")
    }
    else{
        res.status(500).json({message:"Password incorrect"})
    }
    }

const updStatus = (req,res) => {
    const {stat, task_id} = req.body
    status = stat
    let query = `UPDATE tasks SET status = ? WHERE task_id = ?`
    db.query(query,[status,task_id],(error,result) => {
     if(error){
         console.log(error)
     }
    })
}

export {plogin, ulogin, updStatus}

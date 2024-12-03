import db from "../index.js"

const task = (req,res,next) => {
    console.log("task", req.session)
    console.log("task", req.session.id)
    let query = `INSERT INTO tasks(user_id,task,status) VALUES (?, ?, false)`
    db.query(query,[req.session.user_id,req.body.task], (error, result) => {
        if(error){
            res.status(404).json({"messages" : "Couldn't add task, call me"})
            console.log(error)
        }
        else{
            res.redirect("/home")
        }
    })
}
export default task
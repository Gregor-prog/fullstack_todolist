import db from "../index.js"

const home = (req,res) => {
    let query = `SELECT * FROM tasks WHERE user_id = ?`
    db.query(query,[req.session.user_id], (error,result) => {
        if(error){
            res.render("home.ejs", {
                "message": "Could'nt get tasks"
            })
            console.log(error)
        }else{
            if(req.session.authorized){
            res.render("home", {result:result, name:req.session.username})
            console.log(req.session.id)
            console.log(req.session)
            }
            else{res.redirect("/login")}
            }

    })
}

export default home
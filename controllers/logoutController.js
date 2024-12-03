import express from "express"

const logout = (req,res) => {
    req.session.authorized = false
    console.log(req.session)
    res.render("login")
}
export default logout
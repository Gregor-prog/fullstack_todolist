import express from "express"
const router = express.Router()
const app = express()
import {pregister, uregister} from "../controllers/registerController.js"
import {plogin, ulogin,updStatus} from "../controllers/loginController.js"
import home from "../controllers/homeController.js"
import task from "../controllers/taskController.js"
import logout from "../controllers/logoutController.js"
router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get("/register", pregister)
router.post("/authRegister", uregister)
router.get("/login", plogin)
router.post("/authLogin", ulogin)
router.get("/home", home)
router.post("/task", task)
router.post("/updateStatus", updStatus)
router.post("/logout", logout)


export default router
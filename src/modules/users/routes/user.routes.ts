import  { Router } from "express"
import { userController } from "../controllers/user.controller"

import { authenticate } from "../../../middlewares/authenticate.middleware"
import { authorize } from "../../../middlewares/authorize.middleware"


const router = Router()

router.use(authenticate)
router.get("/", (req,res,next) => userController.getUsers(req,res,next))
router.get("/:id",authorize("admin"), (req,res,next) => userController.getUserById(req,res,next))
router.post("/",authorize("admin"), (req,res,next) => userController.createUser(req,res,next))
router.patch("/:id",authorize("admin"), (req,res,next) => userController.updateUser(req,res,next))

export default router
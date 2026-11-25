import { Router } from "express"
import { authControler } from "../controllers/auth.controller"

const router = Router()

router.post("/register", (req, res, next) => authControler.register(req,res,next))

router.post("/login", (req, res, next) => authControler.login(req,res,next))

export default router
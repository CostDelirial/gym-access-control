import { Router } from "express";
import mongoose, { mongo } from "mongoose"

import userRoutes from "../modules/users/routes/user.routes"

const router = Router()

//server arriva
router.get("/health/live", (_req, res) => {
    res.status(200).json({
        success: true,
        status: "Funcionando"
    })
})

//Preparacion
router.get("/health/ready", (_req, res) => {
    const isDatabaseConnected = mongoose.connection.readyState === 1

    if(!isDatabaseConnected){
        return res.status(503).json({
            success: false,
            status: "not ready",
            database: "desconectado"
        })
    }
    return res.status(200).json({
        success: true,
        status: "ready",
        database: "conectado DB"
    })
})


router.use("/users", userRoutes)

export default router;

import { Request, Response, NextFunction } from "express"
import { userService } from "../services/user.service"

import { createUserSchema, updateUserSchema, userIdSchema} from "../validators/user.validator"

class UserController {
    /////////////////////////////////////////////////////////////////////////
    createUser = async ( req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createUserSchema.parse(req.body)
            const user =  await userService.createUser(data)

            res.status(201).json({
                success: true,
                message: "User creado",
                dta: user
            });


        }catch(error){
            next(error)
        }
    }
    //////////////////////////////////////////////////////////////////////////
    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.getUsers()
            res.status(200).json({
                success: true,
                data: users
            })
        } catch(error){
            next(error)
        }
    }
    //////////////////////////////////////////////////////////////////////////
    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } =  userIdSchema.parse(req.params)
            const user = await userService.getUserById(id)

            res.status(200).json({
                success: true,
                data: user
            })

        } catch(error){
            next(error)
        }
    }
    //////////////////////////////////////////////////////////////////////////
    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = userIdSchema.parse(req.params)
            const data  = updateUserSchema.parse(req.body)
            const user = await userService.updateUser(id,data)

            res.status(200).json({
                success: true,
                message: "El usuario se actualizo correctamente",
                data: user
            })

        } catch(error){
            next(error)
        }
    }

}

export const userController = new UserController()


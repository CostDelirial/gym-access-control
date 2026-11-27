import  { userRepository } from '../repositories/user.repository'
import { IUser } from "../interfaces/user.interface"
import { DataHasher } from '../../../shared/utils/hasher'
import { AppError } from '../../../shared/errors/app-error'




class UserService {
///////////////////////////////ME/////////////////////////////////
async getMyProfile(userId: string) {
    const user = await userRepository.findById(userId)
    if(!user){
        throw new AppError("Usuario no encontrado", 404)
    }
    return user
}
/////////////////////////////////////////////////////////////////
async updateMyProfile (userId: string, data:{ name?: string, email?: string, password?: string}){
    return this.updateUser(userId, data)
}
////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
    async createUser(data: Pick<IUser,"name" | "email" | "password">){
        const email = data.email.toLowerCase()

        const existingUser = await userRepository.findByEmail(email)
        
        if(existingUser){
            throw new AppError("El correo electronico ya esta en uso", 409)
        }
        const hashedPassword = await DataHasher.hashPassword(data.password)
        const newUser = await userRepository.create({
            name: data.name,
            email,
            password: hashedPassword
        })
        return this.toSafeUser(newUser.toObject())
    }

    async getUsers(){
        return userRepository.findAll()
    }
////////////////////////////////////////////////////////////////
    async updateUser(id: string, data: Partial<Pick<IUser,"name" | "email" | "password" | "status" | "role">>){
        const user = await userRepository.findById(id)
        if(!user){
            throw new AppError("El usuario no existe",404)
        }
        if(data.email){
          const existingUser = await userRepository.findByEmail(data.email.toLowerCase())
            if( existingUser && existingUser._id.toString() !== id){
                throw new AppError("El correo ya esta registrado",409)
            }
            data.email = data.email?.toLowerCase()
        }
        if(data.password){
            data.password = await DataHasher.hashPassword(data.password)
        }
        const updatedUser = await userRepository.updateById(id, data)
        if(!updatedUser){
            throw new AppError("El usuario no existe",404)
        }
        return updatedUser
    }
///////////////////////////////////////////////////////////////////////////
    async getUserById(id: string){
        const user = await userRepository.findById(id)
        if(!user){
            throw new AppError("El usuario no existe",404)
        }
        return user
    }
////////////////////////////////////////////////////////////////////////////
    private toSafeUser(user: IUser){
        const {password, ...safeUser} = user
        return safeUser
    }
}
export const userService = new UserService()
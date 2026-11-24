import  { userRepository } from '../repositories/user.repository'
import { IUser } from "../interfaces/user.interface"
import { DataHasher } from '../../../sahred/utils/hasher'




class UserService {
/////////////////////////////////////////////////////////////////
    async createUser(data: Pick<IUser,"name" | "email" | "passwordHash">){
        const email = data.email.toLowerCase()

        const existingUser = await userRepository.findByEmail(email)
        
        if(existingUser){
            throw Object.assign(new Error("El correo electrónico ya está en uso"),{status: 409})
        }
        const hashedPassword = await DataHasher.hashPassword(data.passwordHash)
        const newUser = await userRepository.create({
            name: data.name,
            email,
            passwordHash: hashedPassword
        })
        return this.toSafeUser(newUser.toObject())
    }

    async getUsers(){
        return userRepository.findAll()
    }
////////////////////////////////////////////////////////////////
    async updateUser(id: string, data: Partial<Pick<IUser,"name" | "email" | "passwordHash" | "status" | "role">>){
        const user = await userRepository.findById(id)
        if(!user){
            throw Object.assign(new Error("El usario no existe"),{status: 404})
        }
        if(data.email){
          const existingUser = await userRepository.findByEmail(data.email.toLowerCase())
            if( existingUser && existingUser._id.toString() !== id){
                throw Object.assign(new Error("EL correo ya esta registrado"), {status: 409})
            }
            data.email = data.email?.toLowerCase()
        }
        if(data.passwordHash){
            data.passwordHash = await DataHasher.hashPassword(data.passwordHash)
        }
        const updatedUser = await userRepository.updateById(id, data)
        if(!updatedUser){
            throw Object.assign(new Error("El usuario no existe"),{status: 404})
        }
        return updatedUser
    }
///////////////////////////////////////////////////////////////////////////
    async getUserById(id: string){
        const user = await userRepository.findById(id)
        if(!user){
            throw Object.assign(new Error("Usuario no encontrado"),{status: 404})
        }
        return user
    }
////////////////////////////////////////////////////////////////////////////
    private toSafeUser(user: IUser){
        const {passwordHash, ...safeUser} = user
        return safeUser
    }
}
export const userService = new UserService()
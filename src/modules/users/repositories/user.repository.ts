import { IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";

class UserRepository {
    async findAll() {
        return UserModel.find().select("-passwordHash").lean();
    }

    async findById(id: string){
        return UserModel.findById(id).select("-passwordHash").lean();
    }

    async findByEmail(email: string ){
        return UserModel.findOne({email}).lean()
    }
    
    async create(data: Pick<IUser,"name" | "email" | "passwordHash">){
        return UserModel.create(data)
    }

    async updateById(id: string, data: Partial<IUser>){
        return UserModel.findByIdAndUpdate(id, {$set: data},{new: true, runValidators: true}).select("-passwordHash").lean();
    }


}

export const userRepository = new UserRepository()
import { IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";

class UserRepository {
    async findAll() {
        return UserModel.find().select("-password").lean();
    }

    async findById(id: string){
        return UserModel.findById(id).select("-password").lean();
    }

    async findByEmail(email: string ){
        return UserModel.findOne({email}).lean()
    }
    
    async create(data: Pick<IUser,"name" | "email" | "password">){
        return UserModel.create(data)
    }

    async updateById(id: string, data: Partial<IUser>){
        return UserModel.findByIdAndUpdate(id, {$set: data},{new: true, runValidators: true}).select("-password").lean();
    }


}

export const userRepository = new UserRepository()
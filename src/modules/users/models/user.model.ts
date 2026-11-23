import { Schema, model } from "mongoose"
import { IUser } from "../interfaces/user.interface"

const userSchema = new Schema<IUser>({
    name: {type: String, required: true, trim: true, minlength: 3, maxlength: 50},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    passwordHash: {type: String, required: true, select: false},
    status: {type: Boolean, default: true},
    role: {type: String, enum: ["employee", "admin", "user"], default: "user"},
    createdAt: {type: Date, default: Date.now},
    
},{
    timestamps: true,
    versionKey: false,
})

const UserModel = model<IUser>("User", userSchema)
export default UserModel
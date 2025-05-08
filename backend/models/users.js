import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
})

export default mongoose.model('Users', UsersSchema)
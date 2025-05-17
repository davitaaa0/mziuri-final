import express from "express";
import { loginUser, logoutUser, getToken, getUser, registerUser, forgotPasswordUser, resetPasswordUser} from "../controllers/users.js";
import { auth } from '../middlewares/auth.js'

const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/logout', logoutUser)
UsersRouter.post('/get-token', getToken)
UsersRouter.get('/get-user', getUser)
UsersRouter.post('/register', registerUser)
UsersRouter.put('/forgot-password', auth, forgotPasswordUser)
UsersRouter.put('/reset-password', auth, resetPasswordUser)

export default UsersRouter
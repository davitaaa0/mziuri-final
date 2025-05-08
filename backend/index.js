import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import helmet from "helmet"
import compression from 'compression'
import logger from './middlewares/logger.js'
import connectDB from './db/connection.js'
import ProductsRouter from './routes/products.js'
import UsersRouter from './routes/users.js'
import { rateLimit } from 'express-rate-limit'

const app = express()

dotenv.config()

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 100, 
    message: "Too many requests from this IP, please try again later"
})

app.use(limiter)

app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin || '*'); 
    },    
    credentials: true
}));

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(logger)
app.use(compression())

app.use('/api/products', ProductsRouter)
app.use('/api/users', UsersRouter)

app.listen(3003, () => {
    console.log('server has started')
    connectDB(process.env.CONNECTION_STRING)
})
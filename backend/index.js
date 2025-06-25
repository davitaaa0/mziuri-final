import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import compression from 'compression'
import logger from './middlewares/logger.js'
import connectDB from './db/connection.js'
import ProductsRouter from './routes/products.js'
import UsersRouter from './routes/users.js'
import CartRouter from './routes/cart.js'
import { rateLimit } from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()

app.set('trust proxy', 1)

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later',
})
app.use(limiter)

app.use(cors({
  origin: [
    'http://localhost:3003',  
    'http://localhost:3000', 
    'http://localhost:5173',
    'https://davitaspronia.onrender.com',    
  ],
  credentials: true
}))

app.use(helmet())

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        frameSrc: ["'self'", "https://www.google.com"],
        imgSrc: ["'self'", "data:", "http://localhost:3003", "https://htmldemo.net"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdn-uicons.flaticon.com"
        ],
        fontSrc: [
          "'self'",
          "data:", 
          "https://fonts.gstatic.com",
          "https://cdn-uicons.flaticon.com",
          "https://cdnjs.cloudflare.com"
        ],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        connectSrc: [
          "'self'",  
          "http://localhost:3003",
          "https://jsonplaceholder.typicode.com",
          "https://davitaspronia.onrender.com"
        ],
      }
    }
  })
);


app.use(express.json())
app.use(cookieParser())
app.use(logger)
app.use(compression())

app.use('/api/products', ProductsRouter)
app.use('/api/users', UsersRouter)
app.use('/api/cart', CartRouter)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server has started')
  connectDB(process.env.CONNECTION_STRING)
})
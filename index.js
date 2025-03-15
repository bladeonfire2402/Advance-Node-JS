import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import IndexRouter from './src/router/indexRouter.js'
import DBconnect from './src/config/dbConect.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

DBconnect()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header cho phép
}));

app.use('/api',IndexRouter)

app.listen(PORT,()=>{
    console.log(`Server đang chạy trên Port ${PORT}`)
})





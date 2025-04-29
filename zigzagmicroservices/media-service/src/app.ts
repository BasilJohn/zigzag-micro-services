import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mediaRouter from './routes'

dotenv.config()

const app = express()
app.use(cors())

app.use("/api/v1/media", mediaRouter)


export default app
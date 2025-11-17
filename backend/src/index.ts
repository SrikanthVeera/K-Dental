import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import productsRouter from './routes/products.js'

dotenv.config()

const app = express()
app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'k-dental-backend' })
})

// API Routes
app.use('/api/products', productsRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`K-Dental API running on port ${port}`)
})

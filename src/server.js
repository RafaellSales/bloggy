import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes'

dotenv.config()

const server = express()
const port = process.env.PORT || 3000

mongoose.connect(
  `mongodb+srv://ahoycap:${process.env.DB_PASSWORD}@cluster0.wimfi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`)
})

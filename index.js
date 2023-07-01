import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

const app = express()
const port = 8800
dotenv.config()

//connecting to the database
const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGO)
    console.log("conntected to MongoDB")
}

app.listen(port, () => {
    connectToMongo()
    console.log(`app is running on ${port} `)
})


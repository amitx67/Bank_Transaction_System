const express = require("express")
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth.routes")
const accountRouter = require("../src/routes/account.routes")


const app = express()


app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/accounts", accountRouter)

module.exports = app
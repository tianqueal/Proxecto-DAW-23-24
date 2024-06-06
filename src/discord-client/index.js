require("dotenv").config()
const express = require("express")
const path = require("path")
const config = require("./config")
const { startBot } = require("./startBot")
const app = express()
const port = config.PORT || 80

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
  startBot()
})

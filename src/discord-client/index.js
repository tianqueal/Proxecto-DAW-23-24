require("dotenv").config()
const express = require("express")
const path = require("path")
const config = require("./config")
const startBot = require("./startBot")
const app = express()
const port = config.PORT || 80

// Configura Express para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (_, res) => {
  // Envía el archivo HTML
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
  startBot()
})

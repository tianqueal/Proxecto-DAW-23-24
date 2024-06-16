require("dotenv").config()
const express = require("express")
const path = require("path")
const config = require("./config")
const { startBot } = require("./startBot")
const app = express()
const port = config.PORT || 80
const { setGlobalDispatcher, Agent, Pool } = require("undici")
const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

app.use(limiter)

setGlobalDispatcher(
  new Agent({ factory: (origin) => new Pool(origin, { connections: 128 }) })
)

function isValidPath(requestedPath) {
  const fullPath = path.join(__dirname, "public", requestedPath)
  return fullPath.startsWith(path.join(__dirname, "public"))
}

// app.use(express.static(path.join(__dirname, "public")))

app.get("/:path", function (req, res) {
  let requestedPath = req.params.path
  if (isValidPath(requestedPath)) {
    res.sendFile(path.join(__dirname, "public", requestedPath))
  } else {
    res.status(404).send("Not found")
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
  startBot()
})

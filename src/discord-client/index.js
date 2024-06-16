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
  const publicDir = path.join(__dirname, "public")
  const fullPath = path.join(publicDir, requestedPath)
  const normalizedPath = path.normalize(fullPath)

  return (
    normalizedPath.startsWith(publicDir + path.sep) &&
    !path.relative(publicDir, normalizedPath).includes("..")
  )
}

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

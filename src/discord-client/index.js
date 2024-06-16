require("dotenv").config()
const express = require("express")
const path = require("path")
const config = require("./config")
const { startBot } = require("./startBot")
const app = express()
const port = config.PORT || 80
const { setGlobalDispatcher, Agent, Pool } = require("undici")
const rateLimit = require("express-rate-limit")
const sanitizeFilename = require("sanitize-filename")

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
  const sanitizedPath = sanitizeFilename(requestedPath)
  const fullPath = path.join(publicDir, sanitizedPath)
  const normalizedPath = path.resolve(fullPath)

  return (
    normalizedPath.startsWith(publicDir + path.sep) &&
    !path.relative(publicDir, normalizedPath).includes("..")
  )
}

app.use(express.static(path.join(__dirname, "public")))

app.get("/", function (_, res) {
  const indexPath = path.join(__dirname, "public", "index.html")
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send("Not found")
    }
  })
})

app.get("/:path", function (req, res) {
  const requestedPath = req.params.path
  if (isValidPath(requestedPath)) {
    res.sendFile(
      path.join(__dirname, "public", sanitizeFilename(requestedPath)),
      (err) => {
        if (err) {
          res.status(404).send("Not found")
        }
      }
    )
  } else {
    res.status(404).send("Not found")
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
  startBot()
})

const express = require('express')
const cors = require('cors')
const { uuid: uid, isUuid } = require('uuidv4')

const app = express()
const port = 3333

app.use(express.json())
app.use(cors())
app.use(logRequest)

// TIPOS DE REQUESICAO
// GET
// POST
// PUT / PATCH
// DELETE

// TIPOS DE PARAMETROS
// QUERY PARAMS
// ROUTE PARAMS
// REQUEST BODY 

const projects = []



function logRequest(req, res, next) {

  const { url, method } = req

  console.log(`[${method}] - ${url}`)

  return next()
}

function validateProjectId(req, res, next) {
  const { id } = req.params

  if (!isUuid(id)) {
    return res.status(400).json({ message: "not valid Id" })
  }

  next()
}

app.listen(port, () => {
  console.log(`server is running at port 😁 ${port}`)
})


app.get("/projects", (req, res) => {
  const { title, owner } = req.query

  const resultGet = title ? projects.filter(project => project.title.includes(title)) : projects

  return res.json(resultGet)
})

app.put("/projects/:id", validateProjectId, (req, res) => {

  const { id } = req.params
  const { title, owner } = req.body

  const indexChangedProject = projects.findIndex(project => project.id == id)

  if (indexChangedProject < 0) {
    res.status(401).json({ error: "Not Found" })
  }

  const newData = { id, title, owner }

  projects[indexChangedProject] = newData

  return res.json(newData)
})

app.post("/projects", (req, res) => {
  const { title, owner } = req.body

  const project = {
    id: uid(),
    title,
    owner

  }
  projects.push(project)
  return res.status(201).json(project)
})

app.delete("/projects/:id", validateProjectId, (req, res) => {
  const { id } = req.params
  const indexChangedProject = projects.findIndex(project => project.id == id)
  if (indexChangedProject < 0) {
    res.status(401).json({ error: "Not Found" })
  }

  projects.splice(indexChangedProject, 1)

  return res.status(200).json()
})
/*
 * CRUD
 *   Resources: Projects and Tasks
 */

const express = require('express');

const app = express();
app.use(express.json());

let quantidadeAcessos = 0;
const projects = [];

app.use((req, res, next) => {
  quantidadeAcessos += 1;
  console.log(`Acessos: ${quantidadeAcessos}`);
  next();
});

function checkProjectExist(req, res, next) {
  const { id } = req.params;
  const project = projects.find(elem => elem.id == id);
  if (!project) {
    return res.status(400).json({error: 'Project does not exist.'});
  }
  next();
}

// Create Project
app.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title, tasks: [] });
  res.json(projects);
});

// List Projects
app.get('/projects', (_, res) => {
  res.json(projects);
});

// Edit Project
app.put('/projects/:id', checkProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(elem => elem.id == id);
  project.title = title;
  res.json(projects);
});

// Delete Project
app.delete('/projects/:id', checkProjectExist, (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);
  res.send();
});

// Add Task
app.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(elem => elem.id == id);
  project.tasks.push(title);
  res.json(projects);
});

app.listen(3000);

/*
 * CRUD
 *   Resources: Projects and Tasks
 */

const express = require('express');

const app = express();
app.use(express.json());

const projects = [];

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
app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = projects.findIndex(elem => elem.id == id);
  projects[index].title = title;
  res.json(projects);
});

// Delete Project
app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);
  res.send();
});

// Add Task
app.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = projects.findIndex(elem => elem.id == id);
  projects[index].tasks.push(title);
  res.json(projects);
});

app.listen(3000);
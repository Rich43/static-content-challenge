const express = require('express');
const app = express();
const contentEngineService = require('./contentEngineService.js');

function executeContentEngine(page, res) {
  const defaultPage = 'blog/june/company-update';
  const content = contentEngineService(page, defaultPage);
  res.status(content[0]).send(content[1]);
}

app.get("/", (req, res) => {
  const page = req.query['page'];
  executeContentEngine(page, res);
});

app.get('/:page(*)', (req, res) => {
  const page = req.params['page'];
  executeContentEngine(page, res);
});

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000');
});

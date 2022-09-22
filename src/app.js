const express = require('express');
const fs = require('fs');
const app = express();
const ContentEngineService = require('./service/contentEngineService.js');
const ReadFileService = require('./service/readFileService.js');

function executeContentEngine(page, res) {
    const defaultPage = 'blog/june/company-update';
    const content = new ContentEngineService(new ReadFileService(fs)).renderPage(page, defaultPage);
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

module.exports = app;

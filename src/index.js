const express = require("express");
const app = express();
const fs = require("fs");
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const marked = require("marked");

app.get("/", (req, res) => {
  const page = req.query['page'];
  const defaultPage = 'blog/june/company-update';
  const regex = /{{\s*(\w*)\s*}}/g;
  let template = fs.readFileSync('./template.html', 'utf8');
  const matches = template.matchAll(regex);
  for (const match of matches) {
    switch (match[1].toLowerCase()) {
        case 'content':
            let content = fs.readFileSync(
                `./content/${page ? page : defaultPage}/index.md`,
                'utf8'
            );

            content = DOMPurify.sanitize(marked.parse(content));
            template = template.replaceAll(match[0], content);
            break;
    }
  }
  res.send(template);
});

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000');
});

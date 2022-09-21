const whitelist = require('./content/whitelist.json');
const fs = require('fs');
const parseMarkdown = require('./markdown.js');

function checkForInvalidPage(page) {
    if (page) {
        if (!whitelist.find(item => item === page)) {
            return [404, 'Page not found'];
        }
    }
}

function readTemplate() {
    return fs.readFileSync('./template.html', 'utf8');
}

function readMarkdown(page, defaultPage) {
    return fs.readFileSync(
        `./content/${page ? page : defaultPage}/index.md`,
        'utf8'
    );
}

function parsePage(matches, page, defaultPage, template) {
    for (const match of matches) {
        switch (match[1].toLowerCase()) {
            case 'content':
                const invalidPage = checkForInvalidPage(page);
                if (invalidPage) {
                    return invalidPage;
                }

                let content = readMarkdown(page, defaultPage);

                content = parseMarkdown(content);
                template = template.replaceAll(match[0], content);
                break;
        }
    }
    return [200, template];
}

module.exports = (page, defaultPage) => {
    const regex = /{{\s*(\w*)\s*}}/g;
    let template = readTemplate();
    const matches = template.matchAll(regex);
    return parsePage(matches, page, defaultPage, template);
}

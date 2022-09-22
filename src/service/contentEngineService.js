const whitelist = require('../content/whitelist.json');
const fs = require('fs');
const parseMarkdown = require('../util/markdown.js');

class ContentEngineService {
    /**
     * @param {ReadFileService} readFileService
     */
    constructor(readFileService) {
        this.readFileService = readFileService;
    }

    /**
     * Check to see if a page is in the whitelist, return 404 if not
     * @param page The requested page
     * @returns {(number|string)[]} The status code and the page content
     */
    checkForInvalidPage(page) {
        if (page) {
            if (!whitelist.find(item => item === page)) {
                return [404, 'Page not found'];
            }
        }
    }

    /**
     * Read a page from the content folder, parse it and return the result
     * @param matches List of string substitution names in the template
     * @param page The requested page
     * @param defaultPage Default page to display if no page is requested
     * @param template The template to use
     * @returns {(number|string)[]} The status code and the page content
     */
    parsePage(matches, page, defaultPage, template) {
        for (const match of matches) {
            switch (match[1].toLowerCase()) {
                case 'content':
                    const invalidPage = this.checkForInvalidPage(page);
                    if (invalidPage) {
                        return invalidPage;
                    }

                    let content = this.readFileService.readMarkdown(page, defaultPage);

                    content = parseMarkdown(content);
                    template = template.replaceAll(match[0], content);
                    break;
            }
        }
        return [200, template];
    }

    /**
     * Render a page
     * @param page The requested page
     * @param defaultPage Default page to display if no page is requested
     * @returns {(number|string)[]} The status code and the page content
     */
    renderPage(page, defaultPage) {
        const regex = /{{\s*(\w*)\s*}}/g;
        let template = this.readFileService.readTemplate();
        const matches = template.matchAll(regex);
        return this.parsePage(matches, page, defaultPage, template);
    }
}

module.exports = ContentEngineService;

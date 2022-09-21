const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const marked = require('marked');

module.exports = (content) => {
    return DOMPurify.sanitize(marked.parse(content));
}

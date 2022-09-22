class ReadFileService {
    constructor(fs) {
        this.fs = fs;
    }

    readTemplate() {
        return this.fs.readFileSync('./template.html', 'utf8');
    }

    readMarkdown(page, defaultPage) {
        return this.fs.readFileSync(
            `./content/${page ? page : defaultPage}/index.md`,
            'utf8'
        );
    }
}

module.exports = ReadFileService;

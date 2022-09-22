const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const ContentEngineService = require('./contentEngineService');
const request = require('supertest');
const ReadFileService = require('./readFileService');
jest.mock('./readFileService');

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    ReadFileService.mockClear();
    // Arrange
    ReadFileService.mockImplementationOnce(() => {
        return {
            readTemplate: () => {
                return 'Hello {{content}}';
            },
            readMarkdown: () => {
                return '**World**';
            }
        };
    });
});

it('should return 200 OK when opening the home page', () => {
    // Act
    const result = new ContentEngineService(new ReadFileService(null)).renderPage(null, 'blog/june/company-update');
    // Assert
    expect(result[0]).toBe(200);
});

it('should return 200 OK when opening the jobs page', () => {
    // Act
    const result = new ContentEngineService(new ReadFileService(null)).renderPage('jobs', 'blog/june/company-update');
    // Assert
    expect(result[0]).toBe(200);
});

it('should render valid HTML when opening the home page', () => {
    // Act
    const result = new ContentEngineService(new ReadFileService(null)).renderPage(null, 'blog/june/company-update');
    // Assert
    expect(result[1]).toBe('Hello <p><strong>World</strong></p>\n');
});

it('should return 404 Not Found when opening the job page', () => {
    // Act
    const result = new ContentEngineService(new ReadFileService(null)).renderPage('job', 'blog/june/company-update');
    // Assert
    expect(result[0]).toBe(404);
});

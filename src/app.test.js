const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const app = require('./app');
const request = require('supertest');

it('should return 200 OK when opening the home page', () => {
    request(app)
        .get('/')
        .expect(200);
});

it('should return 200 OK when opening the jobs page', () => {
    request(app)
        .get('/jobs')
        .expect(200);
});

it('should return 404 Not Found when opening the job page', () => {
    request(app)
        .get('/job')
        .expect(404);
});
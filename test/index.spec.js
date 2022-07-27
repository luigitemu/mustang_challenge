const app = require('../src/App');
const request = require('supertest');


describe('/', () => { 
test('should respond with a 200 status code', async ()=>{
  await request(app).get('/').expect(200);
 
});

});
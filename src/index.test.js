import supertest from 'supertest';
import app from './app';
import models from './database/models';

describe('test', () => {
  const request = supertest(app);
  afterAll(async () => {
    await models.Message.destroy({ force: true, truncate: { cascade: true } });
    await models.Contact.destroy({ force: true, truncate: { cascade: true } });
  });
  it('passes', (done) => {
    request
      .post('/api/contacts')
      .send({
        number: 726226149,
        name: 'Kevin Koech',
        password: '1239484',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(401);
        done();
      });
  });
});

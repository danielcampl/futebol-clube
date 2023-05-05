import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('test new route /leaderboard', () => {
  afterEach(() => sinon.restore());

  describe('test / from leaderboard', () => {
    it('test / from leaderboard', async () => {
      const result = await chai.request(app).get('/leaderboard');

      expect(result.status).to.equal(200);
    });

    it('table teams list', async () => {
      await chai.request(app).get('/leaderboard').then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
    });
  })

  describe('home teams list', () => {
    it('test status from /home', async () => {
      const result = await chai.request(app).get('/leaderboard/home');

      expect(result.status).to.equal(200);
    });

    it('home teams list', async () => {
      await chai.request(app).get('/leaderboard/home').then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
    });
  });

  describe('home away list', () => {
    it('test status from /away', async () => {
      const result = await chai.request(app).get('/leaderboard/away');

      expect(result.status).to.equal(200);
    });

    it('home away list', async () => {
      await chai.request(app).get('/leaderboard/away').then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
    });
  });
});

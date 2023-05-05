import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Model } from 'sequelize';
import { app } from '../app';

import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test new endpoint /login', () => {
  beforeEach(sinon.restore);
  const testUser = [
    new User({
      id: 5,
      username: 'name',
      role: 'test',
      email: 'danielcampelo159@gmail.com',
      password: '1599'
    })
  ]

  //     } as Example);
  // });

  it('Email auth test', async () => {
    const emailCheck= { email: 'test@test.com', password: '1234567'}
    sinon.stub(Model, 'findAll').resolves([testUser[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const response = await chai.request(app).post('/login').send(emailCheck);

    expect(response.status).to.be.equal(200);
  });

  it('Test invalid user login', async () => {
    const passwordCheck = { email: 'test@test.com', password: 'password'}
    sinon.stub(Model, 'findAll').resolves([testUser[0]]);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const response = await chai.request(app).post('/login').send(passwordCheck);

    expect(response.status).to.be.equal(401);
  });
});
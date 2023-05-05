import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamsModel';
import TeamService from '../services/TeamServices';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Team route', () => {
    const outputMock: Team[] = [new Team({
    id: 1,
    teamName: 'Nome do time',
  })];

  const idMock: Team = new Team({
    id: 1,
    teamName: 'Nome do time',
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('Search all teams', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(outputMock as Team[]);

    const service = new TeamService();
    const response = await service.findAll();

    expect(response).to.be.deep.equal(outputMock);   
    expect(response.length).to.be.equal(1);   
  });

  it('Search teams by ID', async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(idMock);

    const service = new TeamService();
    const response = await service.findOne(1);
    expect(response).to.be.equal(idMock);
  });

  it('Get teams by its ID', async () => {
    sinon.stub(Team, "findOne").resolves(idMock);
    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('id', 1);
    expect(response.body).to.have.property('teamName', 'Nome do time');
  });
});

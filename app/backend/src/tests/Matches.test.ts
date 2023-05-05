import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

// INFO FROM README
const matches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
  },
];


const matchMocks = matches
  .filter((match)=> match.inProgress === true);

describe('Test new route /matches', () => {
  it('Test all matches running "in progress"',async () => {
    sinon.stub(matches, 'find').resolves(matchMocks);
    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.body).to.be.deep.equal(matchMocks);
  })

  it('Test if the match finish',async()=>{
    sinon.stub(jwt, 'verify').resolves();
    const response = await chai.request(app)
    .patch('/matches/1/finish')
    .set('authorization', 'token');

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal({ message: 'Finished' })
  })
});
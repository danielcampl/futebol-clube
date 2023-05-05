interface MatchFilter {
  id: number,
  homeTeamGoals: number,
  homeTeamId: number,
  awayTeamGoals: number,
  awayTeamId: number,
  inProgress: boolean,
}

export default MatchFilter;

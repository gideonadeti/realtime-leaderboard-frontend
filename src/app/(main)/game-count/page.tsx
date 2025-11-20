import useLeaderboards from "../hooks/use-leaderboards";

const Page = () => {
  const { mostGamesLeaderboardQuery } = useLeaderboards();
  const mostGamesLeaderboard = mostGamesLeaderboardQuery.data || [];

  if (mostGamesLeaderboardQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Game Count</h1>
      <ul>
        {mostGamesLeaderboard.map((player) => (
          <li key={player.id}>
            {player.username} - {player.rank} - {player.duration}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

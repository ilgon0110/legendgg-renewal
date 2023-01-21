export const setRank = (rank: number | undefined) => {
  if (rank === 1) return '1st';
  if (rank === 2) return '2nd';
  if (rank === 3) return '3rd';
  return rank ? `${rank}th` : null;
};

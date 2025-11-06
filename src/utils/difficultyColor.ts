export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'iniciante': return '#4CAF50';
    case 'intermediário': return '#FF9800';
    case 'avançado': return '#F44336';
    default: return '#666';
  }
};
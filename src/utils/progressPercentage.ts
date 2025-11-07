export function getProgressPercentage(completed: number, total: number): number {
  if (total <= 0) return 0;
  return (completed / total) * 100;
}
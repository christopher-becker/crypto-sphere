export function getPercentageMoveClass(percentage: number): string {
  return percentage > 0 ? "text-green-500" : "text-red-500";
}

export function getPercentageMoveSymbol(percentage: number): string {
  return percentage > 0 ? "↑" : "↓";
}
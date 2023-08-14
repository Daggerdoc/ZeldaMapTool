export function doesCoordinateMatch(value: number, expectedValue: string): boolean {
  const [min, max] = expectedValue.split('-');

  if (max) {
    return value >= Number(min) && value <= Number(max);
  }

  return value === Number(min);
}

export const DEFAULT_VISIBLE_SCREENS = ['5-10,7'];
export function isScreenVisible(x: number, y: number, visibleTiles: string[]): boolean {
  return visibleTiles.some((tile) => {
    const [tileX, tileY] = tile.split(',');

    return doesCoordinateMatch(x, tileX) && doesCoordinateMatch(y, tileY);
  });
}

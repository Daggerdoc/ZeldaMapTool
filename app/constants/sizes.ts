/**
 * The number of pixels in the map
 */
export const MAP = {
    WIDTH: 4096,
    HEIGHT: 1408
};

/**
 * The number of screens in each map
 */
export const MAP_SCREENS = {
    WIDTH: 16,
    HEIGHT: 8
};

/**
 * The number of pixels in each tile
 */
export const TILE = {
    WIDTH: 16,
    HEIGHT: 16
};

/**
 * The number of tiles in each screen
 */
export const SCREEN_TILES = {
    WIDTH: 16,
    HEIGHT: 11
};

/**
 * The number of pixels in each screen
 */
export const SCREEN = {
    WIDTH: TILE.WIDTH * SCREEN_TILES.WIDTH,
    HEIGHT: TILE.HEIGHT * SCREEN_TILES.HEIGHT
};
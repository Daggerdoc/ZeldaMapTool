import * as SIZES from './constants/sizes.js';

/**
 * @type {HTMLCanvasElement}
 */
const map = document.getElementById("map");
const mapContext = map.getContext("2d");

const zeldaMap = document.createElement("img");
zeldaMap.src = 'Zelda1MapQuest1.png';

map.width = SIZES.MAP.WIDTH;
map.height = SIZES.MAP.HEIGHT;

/**
 * @type {HTMLCanvasElement}
 */
const secrets = document.getElementById("secrets");
const secretsContext = secrets.getContext("2d");
secrets.width = SIZES.MAP.WIDTH;
secrets.height = SIZES.MAP.HEIGHT;

/**
 * @type {HTMLCanvasElement}
 */
const obscure = document.getElementById("obscure");
const obscureContext = obscure.getContext("2d");
obscure.width = SIZES.MAP.WIDTH;
obscure.height = SIZES.MAP.HEIGHT;

const COLORS = {
    TILE_SEPERATOR: 'rgba(0, 0, 0, 0.17)',
    SCREEN_SEPERATOR: 'white'
}

/**
 * Given an x and y outputs the screen index at that x and y.
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
function mouseCoordToScreenIndex(x, y) {
    const screenX = Math.floor(x / (map.clientWidth / SIZES.MAP_SCREENS.WIDTH));
    const screenY = Math.floor(y / (map.clientHeight / SIZES.MAP_SCREENS.HEIGHT));
    
    return screenY * SIZES.MAP_SCREENS.WIDTH + screenX;
}

const OBSCURED_SCREENS = [
    0,1,2,3,4,5,11,12,13,14,15,
    16,17,18,19,20,28,29,30,31,
    32,33,34,45,46,47,
    48,49,63,
    64
];

/**
 * Toggles the obscurity of the screen
 * @param {number} screenIndex - The index of the screen
 */
function toggleObscurity(screenIndex) {
    const index = OBSCURED_SCREENS.indexOf(screenIndex);

    if (index === -1) {
        obscureRender(screenIndex, true);

        OBSCURED_SCREENS.push(screenIndex);
    } else {
        obscureRender(screenIndex, false);

        OBSCURED_SCREENS.splice(index);
    }
}

/**
 * @param {number} screenIndex - The index of the screen
 * @param {boolean} isObscured - Whether the screen should be obscured or not
 */
function obscureRender(screenIndex, isObscured) {
    const screenX = screenIndex % SIZES.MAP_SCREENS.WIDTH;
    const screenY = Math.floor(screenIndex / SIZES.MAP_SCREENS.WIDTH);

    if (isObscured) {
        obscureContext.fillStyle = 'white';
        obscureContext.fillRect(screenX * SIZES.SCREEN.WIDTH, screenY * SIZES.SCREEN.HEIGHT, SIZES.SCREEN.WIDTH, SIZES.SCREEN.HEIGHT);
    } else {
        obscureContext.clearRect(screenX * SIZES.SCREEN.WIDTH, screenY * SIZES.SCREEN.HEIGHT, SIZES.SCREEN.WIDTH, SIZES.SCREEN.HEIGHT);
    }
}

let renderTimeout;
function debounceRender() {
    if (renderTimeout) clearTimeout(renderTimeout);
    renderTimeout = setTimeout(() => render(), 100);
}

/**
 * Draw a bunch of vertical lines
 * @param {number} count - The number of lines to draw
 * @param {string} style - The styling of the line
 * @param {number} length - The length of each line
 * @param {number} buffer - The buffer between each line
 */
function drawVerticalLines(count, style, length, buffer) {
    drawLines(count, style, 0, length, buffer, 0);
}

/**
 * Draw a bunch of horizontal lines
 * @param {number} count - The number of lines to draw
 * @param {string} style - The styling of the line
 * @param {number} length - The length of each line
 * @param {number} buffer - The buffer between each line
 */
function drawHorizontalLines(count, style, length, buffer) {
    drawLines(count, style, length, 0, 0, buffer);
}

/**
 * Draw a bunch of lines generically
 * @param {number} count - The number of lines to draw
 * @param {string} style - The styling of the line
 * @param {number} yDelta - The delta x, used to determine if lines are drawn horizontally
 * @param {number} yDelta - The delta y, used to determine if lines are drawn vertically
 * @param {number} xBuffer - The x buffer, used to determine the spacing between each line horizontally
 * @param {number} yBuffer - The y buffer, used to determine the spacing between each line vertically
 */
function drawLines(count, style, xDelta, yDelta, xBuffer, yBuffer) {
    mapContext.beginPath();

    for(let i = 1; i < count; i++) {
        const x = i * xBuffer;
        const y = i * yBuffer;

        mapContext.lineWidth = 2;
        mapContext.strokeStyle = style;

        mapContext.moveTo(x, y);
        mapContext.lineTo(x + xDelta, y + yDelta);
    }

    mapContext.closePath();
    mapContext.stroke();
}

/**
 * "Opens" a screen by enlarging it and making it editable.
 * @param {number} x - X postion in pixels of screen
 * @param {number} y - Y postion in pixels of screen
 */
function openScreen(x, y){
    console.log("Opening Screen");
    let screenIndex = mouseCoordToScreenIndex(x,y);
    let mapContainer = document.querySelector(".map-container");
    const openScreen = document.createElement("canvas");

    mapContainer.appendChild(openScreen);
    openScreen.id = "openScreen";
    openScreen.width = SIZES.SCREEN.WIDTH;
    openScreen.height = SIZES.SCREEN.HEIGHT;

    const openScreenContext = openScreen.getContext("2d");

    console.log("Screen Index: " + screenIndex);
    const screenX = screenIndex % SIZES.MAP_SCREENS.WIDTH;
    const screenY = Math.floor(screenIndex / SIZES.MAP_SCREENS.WIDTH);

    openScreenContext.drawImage(map, screenX * SIZES.SCREEN.WIDTH, screenY * SIZES.SCREEN.HEIGHT, SIZES.SCREEN.WIDTH, SIZES.SCREEN.HEIGHT, 0, 0, SIZES.SCREEN.WIDTH, SIZES.SCREEN.HEIGHT);

    //TODO: Implement left-click function on the screen. Left click should find tile 
    //clicked on and open a menu with icons and a text field. Clicking an icon will 
    //draw clicked icon onto previously clicked tile. Text field stores note onto a 
    //tile. This note will appear on mouseover  Once menu is open user should be able 
    //to click on icon to make that icon appear on original tile.

    //TODO: Implement left-click function off the screen and add close button. Left-clicking 
    //anywhere on the webpage besides the screen or icon menu should close the icon menu, if 
    //open, or the open screen if not. 
}


function render() {
    requestAnimationFrame(() => {
        mapContext.clearRect(0, 0, map.width, map.height);
        mapContext.drawImage(zeldaMap, 0, 0);
    
        //Draws horizontal lines for tiles
        drawHorizontalLines(8 * 11, COLORS.TILE_SEPERATOR, SIZES.MAP.WIDTH, SIZES.TILE.WIDTH);
    
        // Draws vertical lines for tiles
        drawVerticalLines(16 * 16, COLORS.TILE_SEPERATOR, SIZES.MAP.HEIGHT, SIZES.TILE.HEIGHT);
    
        //Draws horizontal lines for screens
        drawHorizontalLines(8, COLORS.SCREEN_SEPERATOR, SIZES.MAP.WIDTH, SIZES.SCREEN.HEIGHT);
    
        //Draws vertical lines for screens
        drawVerticalLines(16, COLORS.SCREEN_SEPERATOR, SIZES.MAP.HEIGHT, SIZES.SCREEN.WIDTH);
    });
}

zeldaMap.addEventListener('load', (event) => {
    render();

    for (const screen of OBSCURED_SCREENS) {
        obscureRender(screen, true);
    }

    //Creates functionality for left click.
    map.addEventListener("click", (event) => {
        openScreen(event.offsetX, event.offsetY);
    });
    //Creates functionality for right click. 
    map.addEventListener("contextmenu", (event) => {
        event.preventDefault();

        toggleObscurity(mouseCoordToScreenIndex(event.offsetX, event.offsetY));
    });
    document.addEventListener('resize', () => debounceRender());
});

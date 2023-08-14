// map.width = SIZES.MAP.WIDTH;
// map.height = SIZES.MAP.HEIGHT;

// secrets.width = SIZES.MAP.WIDTH;
// secrets.height = SIZES.MAP.HEIGHT;

// obscure.width = SIZES.MAP.WIDTH;
// obscure.height = SIZES.MAP.HEIGHT;

import {get2DContext} from './helper/canvas';
import {Contexts} from './types/contexts';
import {Screen} from './screen';
import {MAP_SCREENS} from '../constants/sizes';

export class Map {
    static readonly WIDTH = 16;
    static readonly HEIGHT = 8;

    private contexts: Contexts;
    private screens: Screen[];

    constructor() {
        const map = get2DContext('map');
        const secrets = get2DContext('secrets');
        const obscure = get2DContext('obscure');

        if (map === null || secrets === null || obscure === null) throw new Error('Failed to initialize canvases');

        this.contexts = {
            map,
            secrets,
            obscure
        };

        this.screens = MAP_SCREENS;
    }

    render() {

    }
}
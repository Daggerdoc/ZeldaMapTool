import '../constants/images';

import {Contexts} from './types/contexts';

export class Screen {
    private x: number;
    private y: number;
    private zoomed: boolean;
    private obscured: boolean;

    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        this.context = context;
        this.x = x;
        this.y = y;
    }

    toggleZoom() {
        this.zoomed = !this.zoomed;
    }

    render(contexts: Contexts) {
        // this.context.drawImage(zeldaMap, x, y);
    }
}
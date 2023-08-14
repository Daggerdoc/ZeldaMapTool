export function getCanvas(id: string): HTMLCanvasElement | null {
    return document.getElementById(id) as HTMLCanvasElement | null;
}

export function get2DContext(id: string): CanvasRenderingContext2D | null {
    return getCanvas(id)?.getContext('2d') ?? null;
}
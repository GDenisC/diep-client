const strokeStrength = 0.75;
const strokes = new Map();

export function fromHex(hex) {
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
    };
}

export function toHex(r, g, b) {
    return "#" + Math.round((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export default function getStrokeColorOf(color) {
    let stroke = strokes.get(color);
    if (stroke) return stroke;
    let hex = fromHex(color);
    stroke = toHex(hex.r * strokeStrength, hex.g * strokeStrength, hex.b * strokeStrength);
    strokes.set(color, stroke);
    return stroke;
}
export default function renderGrid(ctx, startX, startY, endX, endY, tileSize, scalingFactor) {
    ctx.beginPath();

    let x = startX, y = startY;

    for (; x < endX; x += tileSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, endY);
    }

    for (; y < endY; y += tileSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(endX, y);
    }

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.1 * scalingFactor;
    ctx.stroke();
    ctx.globalAlpha = 1;
}
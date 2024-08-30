import { Color } from "../entity";

export default function renderBorder(ctx, centerX, centerY, width, height, tileWidth, tileHeight, tileSize) {
    ctx.fillStyle = '#b6b6b6';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = Color.background;
    let mapWidth = tileWidth * tileSize,
        mapHeight = tileHeight * tileSize;
    ctx.fillRect(centerX - mapWidth / 2, centerY - mapHeight / 2, mapWidth, mapHeight);
}
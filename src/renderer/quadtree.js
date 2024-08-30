import { Color } from "../entity";
import { TILE_SIZE } from "../logic/constants";

function renderQuadTreePart(ctx, quadTree, startX, startY, scale) {
    let x = quadTree.bound.minX * TILE_SIZE * scale,
        y = quadTree.bound.minY * TILE_SIZE * scale,
        width = quadTree.bound.maxX * TILE_SIZE * scale,
        height = quadTree.bound.maxY * TILE_SIZE * scale;

    ctx.rect(x + startX, y + startY, width - x, height - y);

    if (quadTree.nodes[0]) {
        renderQuadTreePart(ctx, quadTree.nodes[0], startX, startY, scale);
        renderQuadTreePart(ctx, quadTree.nodes[1], startX, startY, scale);
        renderQuadTreePart(ctx, quadTree.nodes[2], startX, startY, scale);
        renderQuadTreePart(ctx, quadTree.nodes[3], startX, startY, scale);
    }
}

export default function renderQuadTree(ctx, quadTree, startX, startY, scale) {
    ctx.beginPath();
    renderQuadTreePart(ctx, quadTree, startX, startY, scale);
    ctx.lineWidth = 4 * scale;
    ctx.strokeStyle = Color.yellow;
    ctx.stroke();
}
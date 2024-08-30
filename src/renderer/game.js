import { constants, TILE_SIZE } from "../logic/constants";
import world from "../logic/world";
import renderBorder from "./border";
import * as canvas from "./canvas";
import renderEntities from "./entities";
import renderGrid from "./grid";
import renderQuadTree from "./quadtree";
import { quadtree } from "../logic/update";

export default function renderGame() {
    let ctx = canvas.ctx,
        width = canvas.tag.width,
        halfWidth = width / 2,
        height = canvas.tag.height,
        halfHeight = height / 2,
        scalingFactor = constants.fov / canvas.winScale;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let tileSize = TILE_SIZE * scalingFactor;
    renderBorder(ctx, halfWidth, halfHeight, width, height, world.tileWidth, world.tileHeight, tileSize);
    renderGrid(ctx, (width / 2) % tileSize, (height / 2) % tileSize, width, height, tileSize, constants.fov);
    if (constants.showQuadTree) renderQuadTree(ctx, quadtree, halfWidth, halfHeight, scalingFactor);
    renderEntities(ctx, halfWidth, halfHeight, scalingFactor);
}
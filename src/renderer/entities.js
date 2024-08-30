import { entitiesArray } from "../entity/array";
import { TAU } from "../logic/constants";
import getStrokeColorOf from "./stroke";

function renderEntity(ctx, entity, centerX, centerY, scale) {
    let startAngle = entity.lerp.angle,
        step = TAU / entity.shape;
    ctx.beginPath();
    for (let angle = startAngle; angle < startAngle + TAU; angle += step) {
        ctx.lineTo(
            centerX + (entity.lerp.pos[0] + Math.cos(angle) * entity.lerp.size) * scale,
            centerY + (entity.lerp.pos[1] + Math.sin(angle) * entity.lerp.size) * scale
        );
    }
    ctx.closePath();
    ctx.fillStyle = entity.color;
    ctx.fill();
    ctx.strokeStyle = getStrokeColorOf(entity.color);
    ctx.lineWidth = 3 * scale;
    ctx.stroke();
}

function isEntityInView(entity, centerX, centerY, scale) {
    return (
        entity.lerp.pos[0] + entity.lerp.size > -centerX / scale &&
        entity.lerp.pos[0] - entity.lerp.size < centerX / scale &&
        entity.lerp.pos[1] + entity.lerp.size > -centerY / scale &&
        entity.lerp.pos[1] - entity.lerp.size < centerY / scale
    );
}

export default function renderEntities(ctx, centerX, centerY, scalingFactor) {
    for (let i = 0; i < entitiesArray.length; ++i) {
        if (isEntityInView(entitiesArray[i], centerX, centerY, scalingFactor)) {
            renderEntity(ctx, entitiesArray[i], centerX, centerY, scalingFactor);
        }
    }
}
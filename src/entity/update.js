import { TILE_SIZE } from "../logic/constants";
import world from "../logic/world";
import { lerp, angleLerp } from "./lerp";

export default function updateEntity(entity) {
    for (let i = 0, l = entity.controllers.length; i < l; ++i) {
        entity.controllers[i].update(entity, entity.controllers[i]);
    }

    entity.pos[0] += entity.vel[0];
    entity.pos[1] += entity.vel[1];

    entity.vel[0] *= 0.9;
    entity.vel[1] *= 0.9;

    if (entity.pos[0] < -world.tileWidth / 2) entity.pos[0] = -world.tileWidth / 2;
    else if (entity.pos[0] > world.tileWidth / 2) entity.pos[0] = world.tileWidth / 2;

    if (entity.pos[1] < -world.tileHeight / 2) entity.pos[1] = -world.tileHeight / 2;
    else if (entity.pos[1] > world.tileHeight / 2) entity.pos[1] = world.tileHeight / 2;

    entity.lerp.pos[0] = lerp(entity.lerp.pos[0], entity.pos[0] * TILE_SIZE, 0.2);
    entity.lerp.pos[1] = lerp(entity.lerp.pos[1], entity.pos[1] * TILE_SIZE, 0.2);
    entity.lerp.size = lerp(entity.lerp.size, entity.size * TILE_SIZE, 0.2);
    entity.lerp.angle = angleLerp(entity.lerp.angle, entity.angle, 0.1);
}
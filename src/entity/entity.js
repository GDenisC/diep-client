import { TILE_SIZE } from '../logic/constants';

function LerpEntity(pos, size, angle) {
    return { pos, size, angle };
}

let index = -1;
export default function Entity(pos, size, angle, shape, color, depth, pushFactor, absorptionFactor) {
    size /= 2; // make it radius

    let id = ++index,
        lerp = LerpEntity([pos[0] * TILE_SIZE, pos[1] * TILE_SIZE], size, angle);

    size /= TILE_SIZE;

    return { id, pos, vel: [0, 0], size, angle, shape, color, depth, lerp, pushFactor, absorptionFactor, controllers: [] };
}
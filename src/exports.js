import * as entity from "./entity";
import { constants, TAU, TILE_SIZE } from "./logic/constants";
import { sendRequest } from "./mods";
import getStrokeColorOf, { toHex, fromHex } from "./renderer/stroke";
import { tag, ctx, winScale } from "./renderer/canvas";
import world from "./logic/world";

/** Exports for mods */
export const exports = {
    canvas: tag, ctx, world, winScale,
    ...entity, constants, TILE_SIZE, TAU,
    sendRequest, getStrokeColorOf, toHex, fromHex
};
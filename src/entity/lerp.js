import { TAU } from "../logic/constants";

export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function angleLerp(a, b, t) {
    let da = (b - a) % TAU;
    return a + (2 * da % TAU - da) * t;
}
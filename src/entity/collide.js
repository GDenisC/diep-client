import { TILE_SIZE } from "../logic/constants";

export default function collideEntity(self, other) {
    let dist = Math.sqrt((self.pos[0] - other.pos[0]) ** 2 + (self.pos[1] - other.pos[1]) ** 2);
    if (dist > self.size + other.size) return;
    let angle = Math.atan2(other.pos[1] - self.pos[1], other.pos[0] - self.pos[0]);
    self.vel[0] -= self.absorptionFactor * other.pushFactor * Math.cos(angle) / TILE_SIZE / 2;
    self.vel[1] -= self.absorptionFactor * other.pushFactor * Math.sin(angle) / TILE_SIZE / 2;
    other.vel[0] += other.absorptionFactor * self.pushFactor * Math.cos(angle) / TILE_SIZE / 2;
    other.vel[1] += other.absorptionFactor * self.pushFactor * Math.sin(angle) / TILE_SIZE / 2;
}
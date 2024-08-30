function updateFood(entity, self) {
    self.rotation += 0.005;
    entity.angle += 0.01;
    entity.pos[0] += Math.cos(self.rotation) / 100;
    entity.pos[1] += Math.sin(self.rotation) / 100;
}

export default function foodController() {
    return {
        update: updateFood,
        rotation: Math.random() * Math.PI * 2
    };
}
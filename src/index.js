import { Entity, entitiesSet, sortAllEntities, Color } from './entity';
import foodController from './entity/controllers/food';
import { constants } from './logic/constants';
import update from './logic/update';
import world from './logic/world';
import { loadMods } from './mods';
import renderGame from './renderer/game';
import { exports } from './exports';

function render() {
    renderGame();

    for (let i = 0, l = loadedMods.length; i < l; ++i) {
        if (loadedMods[i].render) loadedMods[i].render();
    }

    requestAnimationFrame(render);
}

function tick() {
    update();

    for (let i = 0, l = loadedMods.length; i < l; ++i) {
        if (loadedMods[i].tick) loadedMods[i].tick();
    }

    setTimeout(tick, 1000 / constants.gameTps);
}

function spawnRandomEntity() {
    let entity;
    switch (Math.floor(Math.random() * 4)) {
        case 0: // square
            entity = Entity(
                [
                    Math.random() * world.tileWidth - world.tileWidth / 2,
                    Math.random() * world.tileHeight - world.tileHeight / 2
                ],
                60 * Math.SQRT1_2,
                Math.PI * 2 * Math.random(),
                4,
                Color.square,
                0,
                8,
                1
            );
            break;
        case 1: // triangle
            entity = Entity(
                [
                    Math.random() * world.tileWidth - world.tileWidth / 2,
                    Math.random() * world.tileHeight - world.tileHeight / 2
                ],
                60 * Math.SQRT1_2,
                Math.PI * 2 * Math.random(),
                3,
                Color.triangle,
                0,
                8,
                1
            );
            break;
        case 2: // pentagon
            entity = Entity(
                [
                    Math.random() * world.tileWidth - world.tileWidth / 2,
                    Math.random() * world.tileHeight - world.tileHeight / 2
                ],
                80 * Math.SQRT1_2,
                Math.PI * 2 * Math.random(),
                5,
                Color.pentagon,
                0,
                11,
                0.5
            );
            break;
        case 3: // alpha pentagon
            entity = Entity(
                [
                    Math.random() * world.tileWidth - world.tileWidth / 2,
                    Math.random() * world.tileHeight - world.tileHeight / 2
                ],
                210 * Math.SQRT1_2,
                Math.PI * 2 * Math.random(),
                5,
                Color.pentagon,
                0,
                11,
                0.05
            );
            break;
    }
    entity.controllers.push(foodController());
    entitiesSet.add(entity);
}

for (let i = 0; i < 50; ++i) {
    spawnRandomEntity();
}
sortAllEntities();

console.log('Loading mods');
let loadedMods;
loadMods().then(mods => {
    loadedMods = mods;
    console.log('Loaded ' + loadedMods.length + ' mods');

    for (let i = 0, l = loadedMods.length; i < l; ++i) {
        if (loadedMods[i].load) loadedMods[i].load(exports);
    }

    render();
    tick();
})
.catch(e => {
    console.error('Failed to load mods', e);
    render();
    tick();
});
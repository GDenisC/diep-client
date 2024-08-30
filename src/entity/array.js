export const entitiesSet = new Set();
export let entitiesArray = [];

export function sortAllEntities() {
    entitiesArray.splice(0, entitiesArray.length);
    entitiesArray = Array.from(entitiesSet);
    entitiesArray.sort((a, b) => a.depth - b.depth);
}
import { AABB, QuadTree, QuadTree_clear, QuadTree_insert, QuadTree_query } from "./quadtree";
import { collideEntity, entitiesArray, updateEntity } from "../entity";
import world from "./world";

export let quadtree = QuadTree(AABB(-world.tileWidth / 2, -world.tileHeight / 2, world.tileWidth / 2, world.tileHeight / 2));

export default function update() {
    let erl = entitiesArray.length;
    QuadTree_clear(quadtree);
    for (let i = 0; i < erl; ++i) {
        QuadTree_insert(quadtree, entitiesArray[i]);
        updateEntity(entitiesArray[i]);
    }

    for (let i = 0; i < erl; ++i) {
        let query = QuadTree_query(quadtree, AABB(entitiesArray[i].pos[0] - entitiesArray[i].size, entitiesArray[i].pos[1] - entitiesArray[i].size, entitiesArray[i].pos[0] + entitiesArray[i].size, entitiesArray[i].pos[1] + entitiesArray[i].size));
        for (let j = 0, l = query.length; j < l; ++j) {
            collideEntity(entitiesArray[i], query[j]);
        }
    }
}
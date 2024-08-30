function AABB(minX, minY, maxX, maxY) {
    return { minX, minY, maxX, maxY };
}

function AABB_overlap(a, b) {
    return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}

function AABB_contains(aabb, entity) {
    return entity.pos[0] >= aabb.minX && entity.pos[0] <= aabb.maxX && entity.pos[1] >= aabb.minY && entity.pos[1] <= aabb.maxY;
}

function QuadTree(bound) {
    return { bound, nodes: Array(4), objects: [] };
}

function QuadTree_split(quadTree) {
    let bound = quadTree.bound,
        nodes = quadTree.nodes,
        midX = (bound.minX + bound.maxX) / 2,
        midY = (bound.minY + bound.maxY) / 2;

    nodes[0] = QuadTree(AABB(bound.minX, bound.minY, midX, midY));
    nodes[1] = QuadTree(AABB(midX, bound.minY, bound.maxX, midY));
    nodes[2] = QuadTree(AABB(bound.minX, midY, midX, bound.maxY));
    nodes[3] = QuadTree(AABB(midX, midY, bound.maxX, bound.maxY));
}

function QuadTree_insert(quadTree, entity) {
    if (!AABB_contains(quadTree.bound, entity)) {
        return false;
    }

    if (quadTree.objects.length < 4) {
        quadTree.objects.push(entity);
        return true;
    }

    if (!quadTree.nodes[0]) {
        QuadTree_split(quadTree);
    }

    if (QuadTree_insert(quadTree.nodes[0], entity)) return true;
    if (QuadTree_insert(quadTree.nodes[1], entity)) return true;
    if (QuadTree_insert(quadTree.nodes[2], entity)) return true;
    if (QuadTree_insert(quadTree.nodes[3], entity)) return true;

    return false;
}

// should be slow if a lot of nodes
function QuadTree_query(quadTree, aabb) {
    if (!AABB_overlap(quadTree.bound, aabb)) {
        return [];
    }

    let points = [];

    for (let i = 0, l = quadTree.objects.length; i < l; ++i) {
        if (AABB_contains(aabb, quadTree.objects[i])) {
            points.push(quadTree.objects[i]);
        }
    }

    if (quadTree.nodes[0]) {
        points = points.concat(
            QuadTree_query(quadTree.nodes[0], aabb),
            QuadTree_query(quadTree.nodes[1], aabb),
            QuadTree_query(quadTree.nodes[2], aabb),
            QuadTree_query(quadTree.nodes[3], aabb)
        );
    }

    return points;
}

function QuadTree_clear(quadTree) {
    quadTree.objects.splice(0, quadTree.objects.length);
    if (quadTree.nodes[0]) {
        QuadTree_clear(quadTree.nodes[0]);
        QuadTree_clear(quadTree.nodes[1]);
        QuadTree_clear(quadTree.nodes[2]);
        QuadTree_clear(quadTree.nodes[3]);
        quadTree.nodes.splice(0, quadTree.nodes.length);
        quadTree.nodes = Array(4);
    }
}

export { AABB, AABB_overlap, QuadTree, QuadTree_insert, QuadTree_query, QuadTree_clear };
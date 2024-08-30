({
    load: exports => {
        addEventListener('wheel', e => {
            exports.constants.fov *= e.deltaY < 0 ? 1.1 : 0.9;
        });
    }
})
let tag = document.createElement('canvas'),
    ctx = tag.getContext('2d'),
    winScale = 1;

if (!ctx) {
    alert('Canvas not supported');
    throw new Error();
}

document.body.appendChild(tag);

function resize() {
    let ratio = window.devicePixelRatio,
        winWidth = window.innerWidth * ratio,
        winHeight = window.innerHeight * ratio;
    tag.width = winWidth;
    tag.height = winHeight;
    winScale = Math.min(1920 / winWidth, 1080 / winHeight);
}

window.addEventListener('resize', resize);
tag.addEventListener('resize', resize);
resize();

function preventDefault(e) {
    e.preventDefault();
}

tag.addEventListener('contextmenu', preventDefault);

export { tag, ctx, winScale };
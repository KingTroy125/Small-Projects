function createStaticNoise() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.1';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    function drawNoise() {
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                const rand = Math.random();
                ctx.fillStyle = `rgba(255, 255, 255, ${rand * 0.1})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    drawNoise();
    setInterval(drawNoise, 50);
}

createStaticNoise();
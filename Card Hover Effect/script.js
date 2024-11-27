// Optional: Add mouse move effect for enhanced user experience //
document.querySelector('.card').addEventListener('mousemove', (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (x - centerX) / 20;

    card.querySelector('.card-inner').style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.querySelector('.card').addEventListener('mouseleave', () => {
    const card = e.currentTarget;
    card.querySelector('.card-inner').style.transform = 'none';
});

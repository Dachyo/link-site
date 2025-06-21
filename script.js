document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = `fadeIn 0.8s ease forwards ${index * 0.2}s`;
        }, 100);
    });
});
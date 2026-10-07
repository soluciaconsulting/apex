// Typewriter tagline in the navbar.
document.addEventListener('DOMContentLoaded', function () {
    // ---------- Typewriter ----------
    const el = document.getElementById('typewriter');
    if (el) {
        const text = el.dataset.text;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let i = 0;
        let deleting = false;

        function tick() {
            el.textContent = text.slice(0, i);
            let delay = deleting ? 35 : 75;

            if (!deleting && i === text.length) {
                deleting = true;
                delay = 2200;            // hold the full line
            } else if (deleting && i === 0) {
                deleting = false;
                delay = 500;
            }
            i += deleting ? -1 : 1;
            if (!deleting && i > text.length) i = text.length;
            setTimeout(tick, delay);
        }

        if (reduceMotion) {
            el.textContent = text;
        } else {
            tick();
        }
    }
});

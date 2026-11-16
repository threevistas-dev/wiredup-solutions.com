/* Wired Up Solutions — blog index category filter.
   Loaded only on blog.html. Cards carry data-category; buttons carry data-filter. */
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.blog-filter');
  const cards = document.querySelectorAll('.blog-card-col');
  const empty = document.querySelector('.blog-empty');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      buttons.forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      let shown = 0;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (empty) empty.style.display = shown ? 'none' : 'block';
    });
  });
});

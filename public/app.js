// Theme handling
(function initTheme() {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem('theme');
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.body.setAttribute('data-theme', theme);
  
    const btn = document.getElementById('themeToggle');
    const icon = btn?.querySelector('.theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? icon.dataset.dark : icon.dataset.light;
  
    btn?.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      if (icon) icon.textContent = next === 'dark' ? icon.dataset.dark : icon.dataset.light;
    });
  })();
  
  // Load markdown → render → build collapsible TOC → add copy buttons → search → active highlighting
  (async () => {
    const articleEl = document.getElementById('doc');
    const res = await fetch('/content.md');
    let md = await res.text();
  
    // Render markdown
    articleEl.innerHTML = marked.parse(md, { mangle: false, headerIds: true });
  
    // Ensure consistent, predictable IDs
    const headings = articleEl.querySelectorAll('h1, h2, h3');
    headings.forEach(h => {
      if (!h.id) {
        const id = h.textContent.trim().toLowerCase().replace(/[^\w]+/g,'-');
        h.id = id;
      }
    });
  
    // Code "Copy" buttons
    document.querySelectorAll('pre > code').forEach((code) => {
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.innerText);
          btn.textContent = 'Copied!';
          setTimeout(() => (btn.textContent = 'Copy'), 1200);
        } catch (_) { btn.textContent = 'Oops'; }
      });
      code.parentElement.appendChild(btn);
    });
  
    // Build collapsible TOC groups:
    // - Group by H2 (e.g., "Prerequisites", "App 1", "App 2", "App 3", "App 4")
    // - Each group contains its H2 link + its H3 children as sublinks
    const toc = document.getElementById('toc');
    toc.innerHTML = '';
  
    const h2s = [...articleEl.querySelectorAll('h2')];
    const groups = [];
  
    h2s.forEach((h2, i) => {
      const group = { h2, h3s: [] };
      let next = h2.nextElementSibling;
      while (next && next.tagName !== 'H2') {
        if (next.tagName === 'H3') group.h3s.push(next);
        next = next.nextElementSibling;
      }
      groups.push(group);
    });
  
    function makeLinkFor(heading) {
      const a = document.createElement('a');
      a.href = `#${heading.id}`;
      a.textContent = heading.textContent;
      a.className = 'toc-link';
      a.dataset.targetId = heading.id;
      return a;
    }
  
    groups.forEach(({h2, h3s}) => {
      const details = document.createElement('details');
      details.className = 'toc-group';
      // default collapsed
      details.open = false;
  
      const summary = document.createElement('summary');
      const caret = document.createElement('span');
      caret.className = 'caret';
      caret.textContent = '▶';
      const label = document.createElement('span');
      label.textContent = h2.textContent;
      summary.appendChild(caret);
      summary.appendChild(label);
      details.appendChild(summary);
  
      const sub = document.createElement('div');
      sub.className = 'toc-subitems';
  
      // Add link to the H2 itself ("Overview" link)
      const linkH2 = makeLinkFor(h2);
      sub.appendChild(linkH2);
  
      // Add H3 children
      h3s.forEach(h3 => {
        const a = makeLinkFor(h3);
        a.style.marginLeft = '8px';
        sub.appendChild(a);
      });
  
      details.appendChild(sub);
      toc.appendChild(details);
    });
  
    // Open the group if URL #hash matches an item within
    function openGroupForHash() {
      const hash = decodeURIComponent(location.hash || '').replace('#','');
      if (!hash) return;
      const link = toc.querySelector(`.toc-link[data-target-id="${hash}"]`);
      if (link) {
        const details = link.closest('.toc-group');
        if (details) details.open = true;
      }
    }
    openGroupForHash();
    window.addEventListener('hashchange', openGroupForHash);
  
    // Active highlight on scroll
    const allAnchors = [...toc.querySelectorAll('.toc-link')];
    const anchorById = new Map(allAnchors.map(a => [a.dataset.targetId, a]));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const a = anchorById.get(id);
        if (!a) return;
        if (entry.isIntersecting) {
          allAnchors.forEach(x => x.classList.remove('active'));
          a.classList.add('active');
          const group = a.closest('.toc-group');
          if (group) group.open = true; // auto-open group when heading is in view
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
  
    headings.forEach(h => observer.observe(h));
  
    // Search (filters the TOC links and opens matching groups)
    const search = document.getElementById('search');
    search?.addEventListener('input', (e) => {
      const q = (e.target.value || '').toLowerCase().trim();
      const groupsEls = [...toc.querySelectorAll('.toc-group')];
      if (!q) {
        // reset: show all and collapse
        groupsEls.forEach(d => {
          d.style.display = '';
          d.open = false;
          d.querySelectorAll('.toc-link').forEach(a => a.style.display = '');
        });
        return;
      }
  
      groupsEls.forEach(d => {
        let matchesGroup = false;
        d.querySelectorAll('.toc-link').forEach(a => {
          const match = a.textContent.toLowerCase().includes(q);
          a.style.display = match ? '' : 'none';
          if (match) matchesGroup = true;
        });
        d.style.display = matchesGroup ? '' : 'none';
        d.open = matchesGroup; // open groups with matches
      });
    });
  
    // Back to Top button
    const topBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
    });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  })();
  
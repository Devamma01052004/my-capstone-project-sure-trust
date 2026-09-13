// Mobile nav toggle
(function navToggle() {
  const btn = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    })
  );
})();

// Scroll-reveal for sections
(function scrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => observer.observe(item));
})();

// Hero AQI dial — animates a sample reading in on load.
(function animateDial() {
  const SAMPLE_AQI = 138;   // illustrative "moderate" reading, scale 0–500
  const MAX_SCALE = 500;
  const CIRCUMFERENCE = 578; // matches stroke-dasharray in CSS

  const numberEl = document.getElementById('dialNumber');
  const fillEl = document.getElementById('dialFill');
  if (!numberEl || !fillEl) return;

  const offset = CIRCUMFERENCE * (1 - SAMPLE_AQI / MAX_SCALE);

  requestAnimationFrame(() => {
    fillEl.style.strokeDashoffset = offset;
  });

  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    numberEl.textContent = Math.round(eased * SAMPLE_AQI);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// Sample week trend chart — illustrative only.
(function drawTrendChart() {
  const canvas = document.getElementById('trendChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth || 640;
  const cssHeight = 220;
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;
  ctx.scale(dpr, dpr);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [112, 128, 145, 138, 160, 121, 104];

  const padding = { top: 20, right: 20, bottom: 30, left: 36 };
  const w = cssWidth - padding.left - padding.right;
  const h = cssHeight - padding.top - padding.bottom;
  const maxVal = Math.max(...values) * 1.15;

  const xFor = (i) => padding.left + (w / (values.length - 1)) * i;
  const yFor = (v) => padding.top + h - (v / maxVal) * h;

  ctx.strokeStyle = 'rgba(143, 163, 150, 0.18)';
  ctx.lineWidth = 1;
  for (let g = 0; g <= 3; g++) {
    const gy = padding.top + (h / 3) * g;
    ctx.beginPath();
    ctx.moveTo(padding.left, gy);
    ctx.lineTo(padding.left + w, gy);
    ctx.stroke();
  }

  ctx.beginPath();
  values.forEach((v, i) => {
    const x = xFor(i);
    const y = yFor(v);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#E8A33D';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  values.forEach((v, i) => {
    ctx.beginPath();
    ctx.arc(xFor(i), yFor(v), 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#0F1614';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#E8A33D';
    ctx.stroke();
  });

  ctx.fillStyle = '#8FA396';
  ctx.font = '11px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  days.forEach((d, i) => {
    ctx.fillText(d, xFor(i), cssHeight - 8);
  });
})();

// Sample city comparison bar chart — illustrative only.
(function drawCityChart() {
  const canvas = document.getElementById('cityChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth || 640;
  const cssHeight = 220;
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;
  ctx.scale(dpr, dpr);

  const cities = ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata'];
  const values = [212, 118, 76, 94, 156];

  const padding = { top: 20, right: 20, bottom: 30, left: 20 };
  const w = cssWidth - padding.left - padding.right;
  const h = cssHeight - padding.top - padding.bottom;
  const maxVal = Math.max(...values) * 1.15;
  const barGap = 18;
  const barWidth = (w - barGap * (values.length - 1)) / values.length;

  ctx.strokeStyle = 'rgba(143, 163, 150, 0.18)';
  ctx.lineWidth = 1;
  for (let g = 0; g <= 3; g++) {
    const gy = padding.top + (h / 3) * g;
    ctx.beginPath();
    ctx.moveTo(padding.left, gy);
    ctx.lineTo(padding.left + w, gy);
    ctx.stroke();
  }

  const colors = ['#C1543C', '#E8A33D', '#4FA8A0', '#4FA8A0', '#E8A33D'];

  values.forEach((v, i) => {
    const barH = (v / maxVal) * h;
    const x = padding.left + i * (barWidth + barGap);
    const y = padding.top + h - barH;
    ctx.fillStyle = colors[i];
    ctx.fillRect(x, y, barWidth, barH);
  });

  ctx.fillStyle = '#8FA396';
  ctx.font = '11px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  cities.forEach((c, i) => {
    const x = padding.left + i * (barWidth + barGap) + barWidth / 2;
    ctx.fillText(c, x, cssHeight - 8);
  });
})();
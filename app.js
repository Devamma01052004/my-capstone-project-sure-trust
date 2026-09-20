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

// Hero AQI dial
(function animateDial() {
  const SAMPLE_AQI = 138;
  const MAX_SCALE = 500;
  const CIRCUMFERENCE = 578;

  const numberEl = document.getElementById('dialNumber');
  const fillEl = document.getElementById('dialFill');
  if (!numberEl || !fillEl) return;

  const offset = CIRCUMFERENCE * (1 - SAMPLE_AQI / MAX_SCALE);
  requestAnimationFrame(() => { fillEl.style.strokeDashoffset = offset; });

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
    const x = xFor(i), y = yFor(v);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
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
  days.forEach((d, i) => ctx.fillText(d, xFor(i), cssHeight - 8));
})();

// Sample pollutant mix donut — illustrative only.
(function drawPollutantChart() {
  const canvas = document.getElementById('pollutantChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth || 640;
  const cssHeight = 220;
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;
  ctx.scale(dpr, dpr);

  const segments = [
    { label: 'PM2.5', value: 38, color: '#C1543C' },
    { label: 'PM10', value: 27, color: '#E8A33D' },
    { label: 'NO2', value: 15, color: '#4FA8A0' },
    { label: 'O3', value: 12, color: '#6FBFB6' },
    { label: 'Other', value: 8, color: '#3A4A42' }
  ];
  const total = segments.reduce((s, x) => s + x.value, 0);

  const cx = cssWidth / 2 - 70, cy = cssHeight / 2, r = 78, inner = 46;
  let angle = -Math.PI / 2;

  segments.forEach(seg => {
    const slice = (seg.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.arc(cx, cy, inner, angle + slice, angle, true);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    angle += slice;
  });

  ctx.font = '11px "IBM Plex Mono", monospace';
  ctx.textAlign = 'left';
  const legendX = cssWidth - 150;
  segments.forEach((seg, i) => {
    const ly = 30 + i * 24;
    ctx.fillStyle = seg.color;
    ctx.fillRect(legendX, ly - 9, 10, 10);
    ctx.fillStyle = '#E8EDE9';
    ctx.fillText(`${seg.label}  ${seg.value}%`, legendX + 16, ly);
  });
})();

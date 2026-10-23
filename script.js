/* ============ DATA ============
   Fallback = approximate Superstore figures.
   The notebook writes exact values to data/data.json, loaded at startup. */
let DATA = {
  kpi: { sales: 2297201, profit: 286397, margin: 12.5 },
  monthly: {
    labels: ["2014-01","2014-04","2014-07","2014-10","2015-01","2015-04","2015-07","2015-10","2016-01","2016-04","2016-07","2016-10","2017-01","2017-04","2017-07","2017-10","2017-12"],
    sales:  [14237,28295,33946,31453,18174,34195,28765,31404,18542,38750,39262,56653,43971,36522,45264,77777,83829]
  },
  region: { labels: ["West","East","Central","South"], sales: [725458,678781,501240,391722], profit: [108418,91523,39706,46749] },
  category: { labels: ["Technology","Furniture","Office Supplies"], sales: [836154,741999,719047], profit: [145455,18451,122491] },
  discount: { labels: ["0%","10%","20%","30%","40%","50%","60%","70%","80%"], profit: [320988,9029,90338,-10369,-23058,-20506,-5944,-40075,-30539] }
};

/* ============ I18N ============ */
const T = {
  en: {
    loading:"Charging data", heroTag:"Python · Pandas · NumPy · Matplotlib",
    heroTitle:"Sales Performance<br/>Analysis",
    heroLead:"4 years of orders from a multimedia & office retailer. Where does the money come from, and where is it lost?",
    heroCta:"Start ↓", pipeTitle:"Data pipeline",
    s1t:"Load", s1d:"9,994 orders · 21 columns", s2t:"Clean", s2d:"Missing values · duplicates · types",
    s3t:"Select", s3d:"Keep 10 business features", s4t:"Analyse", s4d:"EDA · trends · segments",
    kpiTitle:"Headline figures", kSales:"Revenue", kProfit:"Profit", kMargin:"Margin",
    trendTitle:"Monthly sales trend", regionTitle:"Regional performance", catTitle:"Category: sales vs profit", discTitle:"Discount vs profit",
    insTitle:"Actions",
    i1:"Cap discounts at 20 %. Beyond it, every order loses money.",
    i2:"Push Technology: highest revenue and highest margin.",
    i3:"Reprice Furniture: big sales, almost no profit.",
    i4:"Stock up for Q4: Sept, Nov and Dec are the peak months.",
    footer:"Dataset: Sample Superstore (Kaggle) · Analysis in Jupyter",
    sales:"Sales", profit:"Profit", margin:"margin",
    info:{
      step1:["Load","The raw CSV is read with Pandas (latin-1 encoding). Each row is one product line of an order: date, customer segment, region, category, sales, quantity, discount, profit."],
      step2:["Clean","Missing values are checked per column and dropped if present. Exact duplicate rows are removed. Order and Ship dates are converted to datetime so we can group by month."],
      step3:["Select","IDs, names and postal codes add no business signal. We keep: Order Date, Segment, Region, Category, Sub-Category, Sales, Quantity, Discount, Profit, plus a computed Margin."],
      step4:["Analyse","Descriptive stats, then groupby aggregations by month, region, category and discount level. Each question gets one Matplotlib chart in the notebook."],
      kpiSales:["Revenue","Sum of the Sales column over 2014–2017. It measures volume, not health."],
      kpiProfit:["Profit","Sum of the Profit column. This is what the business actually keeps."],
      kpiMargin:["Margin","Profit ÷ Sales. Around 12 %: every $100 sold leaves about $12."],
      trend:["Monthly trend","Sales grow year after year with a clear seasonal pattern: low in January–February, peaks in September, November and December. Click a point for its value."],
      region:["Regions","West and East generate the most revenue and profit. Central has large sales but the weakest margin, mainly due to heavy discounting."],
      category:["Categories","Technology leads on both sales and profit. Furniture sells almost as much as Technology but keeps very little profit: tables and bookcases lose money."],
      discount:["Discount impact","Profit is strongly positive up to 20 % discount, then turns negative. Discounts above 20 % destroy value: this is the main lever to fix."]
    }
  },
  fr: {
    loading:"Chargement des données", heroTag:"Python · Pandas · NumPy · Matplotlib",
    heroTitle:"Analyse des<br/>performances",
    heroLead:"4 ans de commandes d'un magasin multimédia & bureau. D'où vient l'argent, et où se perd-il ?",
    heroCta:"Commencer ↓", pipeTitle:"Pipeline de données",
    s1t:"Charger", s1d:"9 994 commandes · 21 colonnes", s2t:"Nettoyer", s2d:"Valeurs manquantes · doublons · types",
    s3t:"Sélectionner", s3d:"10 variables métier conservées", s4t:"Analyser", s4d:"EDA · tendances · segments",
    kpiTitle:"Chiffres clés", kSales:"Chiffre d'affaires", kProfit:"Bénéfice", kMargin:"Marge",
    trendTitle:"Tendance mensuelle", regionTitle:"Performance régionale", catTitle:"Catégories : ventes vs bénéfice", discTitle:"Remise vs bénéfice",
    insTitle:"Actions",
    i1:"Plafonner les remises à 20 %. Au-delà, chaque commande perd de l'argent.",
    i2:"Miser sur la Technologie : plus gros CA et meilleure marge.",
    i3:"Revoir les prix du Mobilier : beaucoup de ventes, presque aucun bénéfice.",
    i4:"Anticiper le T4 : septembre, novembre et décembre sont les pics.",
    footer:"Données : Sample Superstore (Kaggle) · Analyse sous Jupyter",
    sales:"Ventes", profit:"Bénéfice", margin:"marge",
    info:{
      step1:["Charger","Le CSV brut est lu avec Pandas (encodage latin-1). Chaque ligne est un produit d'une commande : date, segment, région, catégorie, ventes, quantité, remise, bénéfice."],
      step2:["Nettoyer","Les valeurs manquantes sont vérifiées par colonne et supprimées si présentes. Les doublons exacts sont retirés. Les dates sont converties en datetime pour grouper par mois."],
      step3:["Sélectionner","Les identifiants, noms et codes postaux n'apportent rien. On garde : date, segment, région, catégorie, sous-catégorie, ventes, quantité, remise, bénéfice, plus une marge calculée."],
      step4:["Analyser","Statistiques descriptives, puis agrégations groupby par mois, région, catégorie et niveau de remise. Chaque question a son graphique Matplotlib dans le notebook."],
      kpiSales:["Chiffre d'affaires","Somme des ventes 2014–2017. Mesure le volume, pas la santé."],
      kpiProfit:["Bénéfice","Somme de la colonne Profit : ce que l'entreprise garde réellement."],
      kpiMargin:["Marge","Bénéfice ÷ Ventes. Environ 12 % : sur 100 $ vendus, il reste environ 12 $."],
      trend:["Tendance mensuelle","Les ventes progressent chaque année avec une saisonnalité nette : creux en janvier–février, pics en septembre, novembre et décembre. Cliquez sur un point pour sa valeur."],
      region:["Régions","L'Ouest et l'Est génèrent le plus de CA et de bénéfice. Le Centre vend beaucoup mais a la marge la plus faible, surtout à cause des fortes remises."],
      category:["Catégories","La Technologie domine en ventes et en bénéfice. Le Mobilier vend presque autant mais ne garde presque rien : tables et bibliothèques perdent de l'argent."],
      discount:["Impact des remises","Le bénéfice est nettement positif jusqu'à 20 % de remise, puis devient négatif. Au-delà de 20 %, les remises détruisent de la valeur : c'est le levier principal."]
    }
  }
};
let lang = localStorage.getItem("lang") || "en";

/* ============ HELPERS ============ */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const css = v => getComputedStyle(document.body).getPropertyValue(v).trim();
const money = n => (n < 0 ? "-$" : "$") + Math.abs(Math.round(n)).toLocaleString(lang === "fr" ? "fr-FR" : "en-US");

/* ============ LOADER ============ */
function runLoader() {
  return new Promise(resolve => {
    let p = 0;
    const fill = $("#batteryFill"), pct = $("#loadPct");
    const tick = setInterval(() => {
      p = Math.min(100, p + Math.random() * 7 + 2);
      fill.style.width = p + "%";
      pct.textContent = Math.floor(p);
      if (p >= 100) { clearInterval(tick); setTimeout(() => { $("#loader").classList.add("done"); resolve(); }, 350); }
    }, 60);
  });
}

/* ============ CURSOR ============ */
const cursor = $("#cursor");
const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
addEventListener("mousemove", e => {
  mouse.x = e.clientX; mouse.y = e.clientY;
  cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px";
});
addEventListener("mousedown", () => cursor.classList.add("press"));
addEventListener("mouseup", () => cursor.classList.remove("press"));

/* ============ STARS ============ */
const cv = $("#stars"), ctx = cv.getContext("2d");
let stars = [];
function initStars() {
  cv.width = innerWidth; cv.height = innerHeight;
  const n = Math.min(220, Math.floor(innerWidth * innerHeight / 7000));
  stars = Array.from({ length: n }, () => ({
    x: Math.random() * cv.width, y: Math.random() * cv.height,
    r: Math.random() * 1.4 + .3, vx: (Math.random() - .5) * .15, vy: (Math.random() - .5) * .15,
    d: Math.random() * .6 + .2, tw: Math.random() * Math.PI * 2
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  const fg = css("--fg"), acc = css("--accent");
  const ox = (mouse.x - cv.width / 2) * .02, oy = (mouse.y - cv.height / 2) * .02;
  for (const s of stars) {
    s.x += s.vx; s.y += s.vy; s.tw += .03;
    const dx = s.x - mouse.x, dy = s.y - mouse.y, dist = Math.hypot(dx, dy);
    if (dist < 120) { const f = (120 - dist) / 120; s.x += dx / dist * f * 2; s.y += dy / dist * f * 2; }
    if (s.x < 0) s.x = cv.width; if (s.x > cv.width) s.x = 0;
    if (s.y < 0) s.y = cv.height; if (s.y > cv.height) s.y = 0;
    ctx.globalAlpha = .35 + Math.sin(s.tw) * .25 + s.d * .3;
    ctx.fillStyle = dist < 160 ? acc : fg;
    ctx.beginPath(); ctx.arc(s.x - ox * s.d, s.y - oy * s.d, s.r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
addEventListener("resize", initStars);

/* ============ MODAL ============ */
const modal = $("#modal");
function openModal(title, body) {
  $("#modalTitle").textContent = title; $("#modalBody").textContent = body;
  modal.classList.add("open");
}
function openInfo(key) { const [t, b] = T[lang].info[key]; openModal(t, b); }
modal.addEventListener("click", e => { if (e.target === modal || e.target.classList.contains("modal-close")) modal.classList.remove("open"); });
addEventListener("keydown", e => e.key === "Escape" && modal.classList.remove("open"));
document.addEventListener("click", e => { const el = e.target.closest("[data-info]"); if (el) openInfo(el.dataset.info); });

/* ============ LANGUAGE ============ */
function applyLang() {
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach(el => { el.innerHTML = T[lang][el.dataset.i18n]; });
  $("#langBtn").textContent = lang === "en" ? "FR" : "EN";
  Object.values(charts).forEach(c => c.update());
  rebuildCharts();
}
$("#langBtn").addEventListener("click", () => { lang = lang === "en" ? "fr" : "en"; localStorage.setItem("lang", lang); applyLang(); countUp(true); });

/* ============ THEME ============ */
function setTheme(t) { document.body.dataset.theme = t; localStorage.setItem("theme", t); rebuildCharts(); }
$("#themeBtn").addEventListener("click", () => setTheme(document.body.dataset.theme === "dark" ? "light" : "dark"));

/* ============ ACCENT ============ */
function setAccent(c) {
  document.documentElement.style.setProperty("--accent", c);
  localStorage.setItem("accent", c);
  $$(".swatch").forEach(s => s.classList.toggle("active", s.dataset.color === c));
  rebuildCharts();
}
$$(".swatch[data-color]").forEach(s => s.addEventListener("click", () => setAccent(s.dataset.color)));
$("#accentInput").addEventListener("input", e => setAccent(e.target.value));

/* ============ KPI COUNT-UP ============ */
let counted = false;
function countUp(force) {
  if (counted && !force) return; counted = true;
  $$("[data-count]").forEach(el => {
    const target = DATA.kpi[el.dataset.count], pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    const start = performance.now(), dur = force ? 1 : 1600;
    (function step(now) {
      const k = Math.min(1, (now - start) / dur), v = target * (1 - Math.pow(1 - k, 3));
      el.textContent = pre + (suf ? v.toFixed(1) : Math.round(v).toLocaleString(lang === "fr" ? "fr-FR" : "en-US")) + suf;
      if (k < 1) requestAnimationFrame(step);
    })(start);
  });
}

/* ============ CHARTS ============ */
const charts = {};
const built = new Set();
function baseOpts(onPoint) {
  const fg = css("--fg"), line = css("--line");
  return {
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 1400, easing: "easeOutQuart" },
    plugins: {
      legend: { labels: { color: fg, font: { family: "Inconsolata", size: 13, weight: 600 }, boxWidth: 14 } },
      tooltip: { backgroundColor: css("--bg"), titleColor: fg, bodyColor: fg, borderColor: css("--accent"), borderWidth: 2, cornerRadius: 0,
        titleFont: { family: "Inconsolata", weight: 800 }, bodyFont: { family: "Inconsolata" },
        callbacks: { label: c => `${c.dataset.label}: ${money(c.raw)}` } }
    },
    scales: {
      x: { ticks: { color: fg, font: { family: "Inconsolata" } }, grid: { color: line } },
      y: { ticks: { color: fg, font: { family: "Inconsolata" }, callback: v => (v / 1000) + "k" }, grid: { color: line } }
    },
    onClick: (e, els, chart) => { if (els.length) onPoint(els[0].index, els[0].datasetIndex, chart); }
  };
}
const builders = {
  trendChart(cv) {
    const acc = css("--accent");
    const g = cv.getContext("2d").createLinearGradient(0, 0, 0, 400);
    g.addColorStop(0, acc + "66"); g.addColorStop(1, acc + "00");
    return new Chart(cv, {
      type: "line",
      data: { labels: DATA.monthly.labels, datasets: [{ label: T[lang].sales, data: DATA.monthly.sales, borderColor: acc, backgroundColor: g, fill: true, tension: .35, borderWidth: 3, pointRadius: 3, pointHoverRadius: 7, pointBackgroundColor: acc }] },
      options: baseOpts(i => openModal(DATA.monthly.labels[i], `${T[lang].sales}: ${money(DATA.monthly.sales[i])}`))
    });
  },
  regionChart(cv) {
    const d = DATA.region;
    return new Chart(cv, {
      type: "bar",
      data: { labels: d.labels, datasets: [
        { label: T[lang].sales, data: d.sales, backgroundColor: css("--blue") },
        { label: T[lang].profit, data: d.profit, backgroundColor: css("--accent") } ] },
      options: baseOpts(i => openModal(d.labels[i],
        `${T[lang].sales}: ${money(d.sales[i])} · ${T[lang].profit}: ${money(d.profit[i])} · ${T[lang].margin}: ${(d.profit[i] / d.sales[i] * 100).toFixed(1)}%`))
    });
  },
  categoryChart(cv) {
    const d = DATA.category;
    const o = baseOpts(i => openModal(d.labels[i],
      `${T[lang].sales}: ${money(d.sales[i])} · ${T[lang].profit}: ${money(d.profit[i])} · ${T[lang].margin}: ${(d.profit[i] / d.sales[i] * 100).toFixed(1)}%`));
    o.indexAxis = "y";
    [o.scales.x.ticks.callback, o.scales.y.ticks.callback] = [v => (v / 1000) + "k", undefined];
    return new Chart(cv, {
      type: "bar",
      data: { labels: d.labels, datasets: [
        { label: T[lang].sales, data: d.sales, backgroundColor: css("--yellow") },
        { label: T[lang].profit, data: d.profit, backgroundColor: css("--accent") } ] },
      options: o
    });
  },
  discountChart(cv) {
    const d = DATA.discount, acc = css("--accent"), fg = css("--fg");
    return new Chart(cv, {
      type: "bar",
      data: { labels: d.labels, datasets: [{ label: T[lang].profit, data: d.profit,
        backgroundColor: d.profit.map(v => v >= 0 ? acc : "transparent"),
        borderColor: d.profit.map(v => v >= 0 ? acc : fg), borderWidth: 2 }] },
      options: baseOpts(i => openModal(`${lang === "fr" ? "Remise" : "Discount"} ${d.labels[i]}`,
        `${T[lang].profit}: ${money(d.profit[i])}`))
    });
  }
};
function buildChart(id) {
  if (charts[id]) charts[id].destroy();
  charts[id] = builders[id](document.getElementById(id));
  built.add(id);
}
function rebuildCharts() { if (window.Chart) built.forEach(id => buildChart(id)); }

/* ============ REVEAL ON SCROLL ============ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add("visible");
      if (en.target.classList.contains("kpi")) countUp();
      const c = en.target.querySelector("canvas");
      if (c && !built.has(c.id)) buildChart(c.id);
      io.unobserve(en.target);
    });
  }, { threshold: .2 });
  $$(".reveal").forEach(el => io.observe(el));
}

/* ============ INIT ============ */
(async function init() {
  const t = localStorage.getItem("theme"); if (t) document.body.dataset.theme = t;
  const a = localStorage.getItem("accent"); if (a) { document.documentElement.style.setProperty("--accent", a); $("#accentInput").value = a; }
  initStars(); drawStars();
  try { const r = await fetch("data/data.json"); if (r.ok) DATA = await r.json(); } catch (_) { /* fallback data */ }
  applyLang();
  await runLoader();
  initReveal();
})();

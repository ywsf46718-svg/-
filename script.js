"use strict";

/* =========================
   كريب التنين - Script نظيف
   Tracking + Menu + WhatsApp
========================= */

/* ====== CONFIG ====== */
const PHONE = "201011063930";

/* ====== STORAGE KEYS ====== */
const STORAGE = {
  VISITORS: "dc_visitors",
  CALLS: "dc_calls",
  WHATSAPP: "dc_whatsapp",
  ORDERS: "dc_orders"
};

/* ====== STATS ====== */
function getStat(key) {
  return parseInt(localStorage.getItem(key) || "0", 10);
}

function setStat(key, value) {
  localStorage.setItem(key, value);
}

function incStat(key) {
  const value = getStat(key) + 1;
  setStat(key, value);
  return value;
}

function updateUI() {
  const v = document.getElementById("statVisitors");
  const c = document.getElementById("statCalls");
  const w = document.getElementById("statWhatsapp");
  const o = document.getElementById("statOrders");

  if (v) v.innerText = getStat(STORAGE.VISITORS);
  if (c) c.innerText = getStat(STORAGE.CALLS);
  if (w) w.innerText = getStat(STORAGE.WHATSAPP);
  if (o) o.innerText = getStat(STORAGE.ORDERS);
}

/* ====== TRACKING ====== */
function trackVisit() {
  incStat(STORAGE.VISITORS);
}

function trackCall() {
  incStat(STORAGE.CALLS);
}

function trackWhatsapp() {
  incStat(STORAGE.WHATSAPP);
}

function trackOrder() {
  incStat(STORAGE.ORDERS);
}

/* ====== WHATSAPP LINK ====== */
function waLink(msg) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

/* ====== MENU ====== */
const menu = [
  { name: "كريب شاورما لحمة", desc: "لحم طازة + صوص خاص", price: "65 ج", msg: "طلب كريب شاورما لحمة" },
  { name: "كريب كبدة", desc: "كبدة بلدي + بصل", price: "60 ج", msg: "طلب كريب كبدة" },
  { name: "كريب سجق", desc: "سجق حار لذيذ", price: "70 ج", msg: "طلب كريب سجق" },
  { name: "برجر لحم", desc: "برجر 100% لحم", price: "75 ج", msg: "طلب برجر لحم" },
  { name: "ساندوتش كبدة", desc: "كبدة على الصاج", price: "50 ج", msg: "طلب ساندوتش كبدة" },
  { name: "ساندوتش سجق", desc: "سجق + مخلل", price: "55 ج", msg: "طلب ساندوتش سجق" }
];

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  grid.innerHTML = "";

  menu.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div class="price">${item.price}</div>
      <a href="${waLink(item.msg)}" class="btn-order">اطلب الآن</a>
    `;

    card.querySelector(".btn-order").addEventListener("click", () => {
      trackOrder();
      trackWhatsapp();
    });

    grid.appendChild(card);
  });
}

/* ====== GLOBAL EVENTS (NO DUPLICATION) ====== */
function bindEvents() {
  // Call buttons
  document.querySelectorAll('a[href^="tel:"]').forEach(btn => {
    btn.addEventListener("click", () => trackCall());
  });

  // WhatsApp buttons
  document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener("click", () => {
      // avoid double count if it's menu order
      if (!btn.classList.contains("btn-order")) {
        trackWhatsapp();
      }
    });
  });
}

/* ====== INIT ====== */
document.addEventListener("DOMContentLoaded", () => {
  trackVisit();
  renderMenu();
  bindEvents();
  updateUI();

  console.log("كريب التنين - script loaded ✔️");
});
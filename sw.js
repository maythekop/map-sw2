/* Service worker ของตัวห่อ — แคชเฉพาะหน้าเปิดแอปและไอคอน (ไม่แคชข้อมูลจาก Apps Script)
   เปลี่ยนเลข VERSION ทุกครั้งที่แก้ไฟล์ในตัวห่อ เพื่อให้เครื่องผู้ใช้โหลดของใหม่ */
var VERSION = 'map-sw2-v1';
var SHELL = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;           // ของ Google/Apps Script ไม่ยุ่ง
  // network-first สำหรับไฟล์ตัวห่อ — ออฟไลน์ค่อยใช้แคช
  e.respondWith(fetch(e.request).then(function (r) {
    var cp = r.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, cp); }); return r;
  }).catch(function () { return caches.match(e.request); }));
});

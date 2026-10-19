/* 앱 껍데기(아이콘·시작화면)만 저장 + 푸시 수신. 실제 데이터는 항상 구글 시트에서 새로 불러옴 */
const CACHE = 'shell-v4';
const FILES = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/favicon.png'];

/* ---- 푸시 (Firebase) ---- */
try {
  importScripts('config.js');
  const C = self.APP_CONFIG || {};
  if (C.FIREBASE && C.FIREBASE.apiKey && C.VAPID_KEY) {
    importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
                  'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
    firebase.initializeApp(C.FIREBASE);
    firebase.messaging();   // 백그라운드 알림은 Firebase가 자동으로 표시 (누르면 앱이 열림)
  }
} catch (e) { /* 푸시 미설정이거나 오프라인 — 앱은 그대로 동작 */ }

/* ---- 캐시 ---- */
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;   // 구글 쪽 요청은 건드리지 않음
  e.respondWith(   // 네트워크 우선, 실패하면 저장본
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});

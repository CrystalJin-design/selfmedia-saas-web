const CACHE="sm-shell-7a237809-7bcdd5447214";
const PREFIX="sm-shell-7a237809-";
const ASSETS=["/selfmedia-saas-web/icon.svg","/selfmedia-saas-web/index.html","/selfmedia-saas-web/assets/index-Bn1fJJGD.js","/selfmedia-saas-web/assets/index-Dv-gpipc.css"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||event.request.headers.has('authorization'))return;
if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.open(CACHE).then(cache=>cache.match("/selfmedia-saas-web/index.html"))));return;}
if(ASSETS.includes(url.pathname))event.respondWith(caches.open(CACHE).then(cache=>cache.match(url.pathname)).then(hit=>hit||fetch(event.request)));});
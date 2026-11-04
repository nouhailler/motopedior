import {precacheAndRoute,cleanupOutdatedCaches,createHandlerBoundToURL} from 'workbox-precaching';
import {registerRoute,NavigationRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {clientsClaim} from 'workbox-core';
self.skipWaiting();clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);cleanupOutdatedCaches();
registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')));
const browsing=new CacheFirst({cacheName:'moto-browsing-v2',plugins:[new CacheableResponsePlugin({statuses:[200]}),new ExpirationPlugin({maxEntries:90,maxAgeSeconds:30*24*60*60,purgeOnQuotaError:true})]});
registerRoute(({url,request})=>url.origin===self.location.origin&&request.destination==='image'&&url.pathname.startsWith('/images/'),async context=>{
 const pinned=await caches.open('moto-pinned-v2');
 const retained=await pinned.match(context.request);
 if(retained)return retained;
 try{return await browsing.handle(context)}catch{return (await caches.match('/image-unavailable.svg'))||Response.error()}
});
// Migration: remove old caches that could contain photographs with incomplete rights.
self.addEventListener('activate',event=>event.waitUntil(Promise.all(['moto-images','moto-images-v1'].map(name=>caches.delete(name)))));

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {VitePWA} from 'vite-plugin-pwa';
export default defineConfig({plugins:[react(),tailwindcss(),VitePWA({registerType:'autoUpdate',includeAssets:['icon.svg','icon-192.png','icon-512.png'],manifest:{name:'MotoPedia — Encyclopédie moto',short_name:'MotoPedia',lang:'fr',description:'Une histoire de passion, de 1885 à aujourd’hui.',theme_color:'#101110',background_color:'#101110',display:'standalone',start_url:'/',icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}]},workbox:{globPatterns:['**/*.{js,css,html,json,png,svg,webp}'],runtimeCaching:[{urlPattern:/^https:\/\/images\.unsplash\.com\/.*/i,handler:'CacheFirst',options:{cacheName:'moto-images',expiration:{maxEntries:160,maxAgeSeconds:31536000},cacheableResponse:{statuses:[0,200]}}}]}})]});

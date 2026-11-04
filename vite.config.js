import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {VitePWA} from 'vite-plugin-pwa';
export default defineConfig({plugins:[react(),tailwindcss(),VitePWA({registerType:'autoUpdate',strategies:'injectManifest',srcDir:'src',filename:'sw.js',includeAssets:['icon.svg','icon-192.png','icon-512.png'],manifest:{name:'MotoPedia — Encyclopédie moto',short_name:'MotoPedia',lang:'fr',description:'Une histoire de passion, de 1885 à aujourd’hui.',theme_color:'#101110',background_color:'#101110',display:'standalone',start_url:'/',icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}]},injectManifest:{globPatterns:['**/*.{js,css,html,json,png,svg}'],globIgnores:['**/photo-inventory.json']}})]});

import React from 'react';

export const FALLBACK_IMAGE='/image-unavailable.svg';
export function isApproved(photo){
 return !!photo && photo.license?.status==='allowed' && ['exact','approximate'].includes(photo.match);
}
export function Photo({m,className='',eager=false,asset}){
 const approved=isApproved(asset||m.photo);const photo=asset||m.photo;
 const src=approved?photo.image:FALLBACK_IMAGE;
 return <img key={src} className={className} src={src}
  srcSet={approved?Object.entries(photo.local).map(([width,url])=>`${url} ${width}w`).join(','):undefined}
  sizes={eager?'100vw':'(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw'}
  alt={approved?`${m.brand} ${m.model}${photo.match==='approximate'?' — modèle ou variante proche':''}`:`${m.brand} ${m.model} — aucune photo validée`}
  loading={eager?'eager':'lazy'} decoding="async"
  onLoad={e=>e.currentTarget.classList.add('loaded')}
  onError={e=>{e.currentTarget.removeAttribute('srcset');e.currentTarget.src=FALLBACK_IMAGE;e.currentTarget.classList.add('loaded');e.currentTarget.alt='Photo indisponible — '+m.brand+' '+m.model;}}/>;
}
export function PhotoCredit({photo,className=''}){
 if(!isApproved(photo))return <span className={'photo-credit '+className}>Aucune photo validée</span>;
 return <span className={'photo-credit '+className}>Photo : {photo.attribution||photo.author||'Auteur non identifié (domaine public)'} — <a href={photo.license.url} target="_blank" rel="noreferrer">{photo.license.name}</a> — <a href={photo.sourcePage} target="_blank" rel="noreferrer">Wikimedia Commons ↗</a><span className="photo-changes"> · WebP, redimensionnée{photo.license.shareAlike?' · adaptation sous la même licence':''}</span></span>;
}
// A separate bounded cache protects user selections from ordinary browsing eviction.
export async function retainPhotos(model){
 if(!isApproved(model.photo))return null;
 if(!('caches' in window))return false;
 const assets=[model.photo,...(model.gallery||[])].filter(isApproved);
 const quota=await navigator.storage?.estimate?.();
 if(quota?.quota && quota.usage/quota.quota>.9)return false;
 const cache=await caches.open('moto-pinned-v2');
 const urls=assets.flatMap(p=>Object.values(p.local));
 const existing=await cache.keys();
 const additions=urls.filter(url=>!existing.some(r=>r.url===new URL(url,location.origin).href));
 if(existing.length+additions.length>180)return false;
 for(const photo of assets)for(const url of Object.values(photo.local)){
  if(await cache.match(url))continue;
  const response=await fetch(url);
  if(!response.ok)throw new Error('Photo non disponible');
  await cache.put(url,response);
 }
 return true;
}
export async function pruneRetainedPhotos(models,ids){
 if(!('caches' in window))return;
 const keep=new Set(models.filter(m=>ids.includes(m.id)).flatMap(m=>[m.photo,...(m.gallery||[])].filter(isApproved).flatMap(p=>Object.values(p.local))).map(url=>new URL(url,location.origin).href));
 const cache=await caches.open('moto-pinned-v2');
 for(const request of await cache.keys())if(!keep.has(request.url))await cache.delete(request);
}

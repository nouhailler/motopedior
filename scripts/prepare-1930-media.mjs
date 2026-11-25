// Merge a reviewed staging export; never run the Commons publisher on the full image library.
import {readFile,writeFile,copyFile} from 'node:fs/promises';
import {resolve,basename} from 'node:path';
const stage=resolve(process.argv[2]||'/tmp/mp1930-media');
const read=async p=>JSON.parse(await readFile(p,'utf8'));
const write=async(p,d)=>writeFile(p,JSON.stringify(d,null,2)+'\n');
const curated=await read('data/verified-1930.json');
const staged=await read(stage+'/public/motos.json');
const models=await read('data/models.json'),catalog=await read('public/motos.json'),reviews=await read('data/photo-reviews.json'),credits=await read('public/photo-credits.json'),audit=await read('public/photo-inventory.json');
const stagedCredits=await read(stage+'/public/photo-credits.json'),stagedReviews=await read(stage+'/data/photo-reviews.json'),stagedAudit=await read(stage+'/public/photo-inventory.json');
for(const incoming of staged){
 const m=curated.models.find(m=>m.id===incoming.id);if(!m)throw Error('Modèle hors lot : '+incoming.id);
 if(incoming.photo&&(incoming.photo.license.status!=='allowed'||!incoming.photo.author||!incoming.photo.sourcePage))throw Error('Droits ou attribution incomplets');
 const flat={id:m.id,brand:m.brand,model:m.name,year:null,endYear:null,country:m.origin_country,category:'Vintage',description:m.description,sourcePage:curated.sources[m.sources[0]].url};
 const replace=(list,key,row)=>{const i=list.findIndex(x=>x[key]===row[key]);if(i<0)list.push(row);else list[i]=row;};
 replace(models,'id',{...flat,imageQueries:[m.brand+' '+m.name]});
 replace(catalog,'id',{...flat,...Object.fromEntries(['photo','image','gallery','photoStatus','photoStatusNote'].map(k=>[k,incoming[k]]))});
 reviews[m.id]=stagedReviews[m.id]||{reviewedAt:'2026-11-23',note:'Aucune correspondance fiable validée dans Commons.',photos:[]};
 for(let i=credits.length-1;i>=0;i--)if(credits[i].modelId===m.id)credits.splice(i,1);
 credits.push(...stagedCredits.filter(p=>p.modelId===m.id));
 const row=stagedAudit.models.find(r=>r.modelId===m.id);if(row)replace(audit.models,'modelId',{...row,brand:m.brand,model:m.name});
 for(const photo of [incoming.photo,...(incoming.gallery||[])].filter(Boolean))for(const path of Object.values(photo.local||{})){
  if(!path.startsWith('/images/')||path!==('/images/'+basename(path)))throw Error('Chemin image invalide');
  await copyFile(stage+'/public'+path,'public'+path);
 }
}
audit.generatedAt=stagedAudit.generatedAt;
await Promise.all([write('data/models.json',models),write('public/motos.json',catalog),write('data/photo-reviews.json',reviews),write('public/photo-credits.json',credits),write('public/photo-inventory.json',audit)]);
console.log(staged.length+' fiches médias fusionnées, anciens assets conservés.');

import {appendResearchReferences} from '../src/history/research-updates.js';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {readFile,writeFile} from 'node:fs/promises';
import {createVehicle,emptyDate,stableId,normalize,validateInventory} from '../src/history/domain.js';
import {insertVehicle} from '../src/history/operations.js';
const read=async file=>JSON.parse(await readFile(file,'utf8'));


export function integrateHistoricalBatch(inventory,curated,batch,photos=[],{start=1911,end=1920}={}){
inventory=structuredClone(inventory);batch=structuredClone(batch);const added=[];
function sourceFor(key){const input=curated.sources[key];if(!input)throw Error('Source éditoriale absente : '+key);const id=stableId('source',input.url);let source=inventory.sources.find(s=>s.id===id);if(!source){source={id,...structuredClone(input),confirmed_fields:[],notes:'Source réellement consultée ; seuls les faits explicitement rattachés sont confirmés. Niveau B pour les notices de musée et ouvrages spécialisés de ce lot.'};inventory.sources.push(source)}return source;}
for(const m of curated.models){
 if(inventory.vehicles.some(v=>v.id===m.id)||inventory.redirects?.[m.id])continue;
 const proof=curated.sources[m.sources?.[0]],d=m.construction;
 if(!proof||!['A','B'].includes(proof.reliability)||['patent','iconographic'].includes(proof.type))throw Error('Preuve de construction historique insuffisante : '+m.id);
 const lo=d?.year??d?.earliest,hi=d?.year??d?.latest;
 if(!Number.isInteger(lo)||!Number.isInteger(hi)||lo>hi||lo<start||hi>end||!['exact','approximate','range'].includes(d.precision))throw Error('Construction datée hors du lot ou non démontrée : '+m.id);
 const documents=m.sources.map(sourceFor);const grade=curated.sources[m.sources[0]].reliability;
 const maker=inventory.manufacturers.find(x=>[x.name,x.official_name,...x.aliases].some(a=>normalize(a)===normalize(m.manufacturer)));
 const mid=maker?.id||stableId('manufacturer',m.manufacturer),bid=maker?inventory.brands.find(b=>b.manufacturer_id===mid&&normalize(b.name)===normalize(m.brand))?.id:undefined;
 let brandId=bid||stableId('brand',m.brand);
 // A historical factory name supplements the existing brand registry; no duplicate maker is created for spelling differences.
 if(!maker)inventory.manufacturers.push({id:mid,name:m.manufacturer,official_name:m.manufacturer_official_name||null,aliases:[...new Set([...(m.manufacturer_aliases||[]),...(m.manufacturer===m.brand?[]:[m.brand])])],origin_country:m.origin_country,foundation_year:null,dissolution_year:null,history:'Identité et nom historique documentés dans les fiches de ce lot ; aucune fusion ou reprise de marque supposée.',official_website:null,brand_ids:[brandId],source_ids:documents.map(s=>s.id),ownership_events:[],confidence:grade});
 const knownBrand=inventory.brands.find(b=>b.id===brandId);if(knownBrand&&knownBrand.manufacturer_id!==mid)brandId=stableId('brand',m.brand+':'+mid);
 if(!inventory.brands.some(b=>b.id===brandId))inventory.brands.push({id:brandId,name:m.brand,aliases:[],manufacturer_id:mid,history:[]});
 const flat=photos.find(p=>p.id===m.id);
 const v=createVehicle({id:m.id,name:m.name,aliases:[...new Set([...(m.aliases||[]),m.brand+' '+m.name])],manufacturer_id:mid,brand_id:brandId,origin_country:m.origin_country,category:'motorcycle',subcategory:'gasoline',propulsion:'gasoline',historical_status:m.status,existence_verified:true,description:m.description,variant:m.variant||null,source_ids:documents.map(s=>s.id),historical_manufacturer:m.historical_manufacturer||null,relationships:(m.relationships||[]).map(r=>({type:r.type,target_id:r.target_id,note:r.note,source_ids:r.sources.map(k=>sourceFor(k).id)})),legacy:flat?structuredClone(flat):null,media:{photo:flat?.photo||null,gallery:flat?.gallery||[],photoStatus:flat?.photoStatus||'none',photoStatusNote:flat?.photoStatusNote||'Aucune photo de cette version n’a été validée.'}});
 function claim(path,value,key=m.sources[0],note=''){
  const s=sourceFor(key),confidence=curated.sources[key].reliability;v.source_ids=[...new Set([...v.source_ids,s.id])];
  v.evidence.push({id:stableId('evidence',`${m.id}:${path}:${JSON.stringify(value)}`),field_path:path,value,source_ids:[s.id],confidence,verified:true,note,recorded_at:'2026-11-07'});
  s.confirmed_fields=[...new Set([...s.confirmed_fields,`${m.id}:${path}`])];
 }
 const date=(year,key=m.sources[0],note='',precision='exact')=>({...emptyDate(),year,precision,source_ids:[sourceFor(key).id],confidence:curated.sources[key].reliability,verified:true,note});
 if(!m.dates?.prototype_year){v.documented_construction={...date(m.construction.year,m.sources[0],m.construction.note,m.construction.precision),earliest:m.construction.earliest??null,latest:m.construction.latest??null};claim('documented_construction',{year:m.construction.year,earliest:m.construction.earliest??null,latest:m.construction.latest??null,precision:m.construction.precision});}
 v.specializations=m.specializations||[];if(v.specializations.length)claim('specializations',v.specializations);
 if(m.mechanical_details){v.mechanical_details=structuredClone(m.mechanical_details);for(const [key,value]of Object.entries(v.mechanical_details))if(value!==null)claim('mechanical_details.'+key,value);}
 if(m.id==='1912-puch-300'){const s=sourceFor('puch');claim('origin_country',m.origin_country,'puch','Le pays de fabrication est documenté par l’histoire de l’usine de Graz.');}
 for(const [key,year]of Object.entries(m.dates||{})){const sk=m.date_sources?.[key]||m.sources[0];v.dates[key]=date(year,sk,key==='commercialization_year'?'Date de commercialisation indépendante de la construction de cet exemplaire.':m.construction.note);claim('dates.'+key,{year,precision:'exact'},sk);}
 if(m.presentation_year){v.presentation_date=date(m.presentation_year,m.sources[0],'Présentation publique distincte de la date de fabrication de l’exemplaire.');claim('presentation_date',{year:m.presentation_year,precision:'exact'});}
 for(const [key,value]of Object.entries(m.technical)){v.technical[key]=value;claim('technical.'+key,value,m.technical_sources?.[key]||m.sources[0]);}
 for(const [path,value]of Object.entries({name:m.name,manufacturer_id:mid,origin_country:m.origin_country,existence_verified:true,historical_status:m.status,category:'motorcycle',subcategory:'gasoline',propulsion:'gasoline'}))claim(path,value,m.field_sources?.[path]||(path==='origin_country'&&m.id==='1912-puch-300'?'puch':m.sources[0]));
 if(v.historical_manufacturer)claim('historical_manufacturer',v.historical_manufacturer);
 if(m.technical_notes)v.justifications.push({code:'scope_of_specifications',note:m.technical_notes,source_ids:documents.map(s=>s.id)});
 for(const c of m.conflicts||[])v.contradictions.push({id:stableId('conflict',m.id+c.field_path),field_path:c.field_path,status:'open',description:c.description,values:c.values,source_ids:c.sources.map(k=>sourceFor(k).id),resolution:null});
 const weakest=[...Object.values(m.technical_sources||{}),...Object.values(m.field_sources||{})].map(k=>curated.sources[k].reliability).concat(grade).sort().at(-1);
 v.confidence={global:v.contradictions.length?'D':weakest,dates:grade,technical:weakest,production:grade};
 v.review={status:v.contradictions.length?'in_review':'verified',reviewed_at:v.contradictions.length?null:'2026-11-07',note:'Validation limitée aux faits renseignés et à l’identité de la version ; valeurs inconnues nulles, sources et dates indépendantes conservées.'};
 for(const photo of [v.media.photo,...v.media.gallery].filter(Boolean)){const id=stableId('source',photo.sourcePage);if(!inventory.sources.some(s=>s.id===id))inventory.sources.push({id,title:photo.fileTitle,url:photo.sourcePage,author:photo.author||null,organization:'Wikimedia Commons',published_at:null,consulted_at:photo.checkedAt,type:'iconographic',reliability:'C',confirmed_fields:[`${m.id}:media`],notes:'Droits et identification du fichier, pas une preuve des spécifications mécaniques.'});v.source_ids.push(id);}
 v.history.push({at:'2026-11-07',action:`integrate_${start}_${end}`,note:'Existence et version documentées avant insertion. Les fiches antérieures ne sont pas réécrites.'});
 inventory=insertVehicle(inventory,v,{allowRelated:!!v.relationships.length});added.push(v.id);
}
for(const ref of batch.references){ref.source_ids=(ref.source_keys||[]).map(k=>sourceFor(k).id);delete ref.source_keys;if(!ref.vehicle_id){ref.candidate={existence_verified:false,historical_status:'unconfirmed',manufacturer_id:null,origin_country:null,dates:Object.fromEntries(['design_year','patent_year','prototype_year','production_start_year','production_end_year','commercialization_year'].map(k=>[k,emptyDate()])),technical:createVehicle().technical};}}
const existingBatch=inventory.research_batches?.find(b=>b.id===batch.id);
const researchUpdated=existingBatch?appendResearchReferences(existingBatch,batch):false;
if(researchUpdated)inventory.history.push({at:'2026-11-07',action:'append_research_annotations',batch_id:batch.id,note:'Complément américain fourni par l’utilisateur : repères de construction ou commercialisation, non dates de premier exemplaire. Fiches et décisions existantes préservées.'});
const newBatch=!existingBatch;if(newBatch){inventory.research_batches??=[];inventory.research_batches.push(batch);inventory.history.push({at:'2026-11-07',action:'append_research_batch',batch_id:batch.id,note:`${batch.references.length} références de travail ; les entrées non documentées sont des candidates séparées, pas des véhicules validés.`});}
if(added.length||newBatch)inventory.catalogue_release=batch.id;
const errors=validateInventory(inventory).filter(e=>e.severity==='error');if(errors.length)throw Error(JSON.stringify(errors,null,2));
return {inventory,added,references:batch.references.length,pending:batch.references.filter(r=>r.decision==='pending').length};
}
export const integrate1911=(...args)=>integrateHistoricalBatch(...args);
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
const curated=await read('data/verified-1911-1920.json'),batch=await read('data/research-1911-1920.json');
const result=integrate1911(await read('public/inventory.json'),curated,batch,await read('public/motos.json'));
await writeFile('public/inventory.json',JSON.stringify(result.inventory,null,2)+'\n');console.log(JSON.stringify({added:result.added.length,total:result.inventory.vehicles.length,references:result.references,pending:result.pending}));

}

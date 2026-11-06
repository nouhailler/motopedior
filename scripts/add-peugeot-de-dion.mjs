import {readFile,writeFile} from 'node:fs/promises';
import {createVehicle,emptyDate,stableId,now,validateInventory} from '../src/history/domain.js';
import {insertVehicle} from '../src/history/operations.js';
const read=async path=>JSON.parse(await readFile(path,'utf8'));
let inventory=await read('public/inventory.json');const models=await read('public/motos.json');const added=[];
for(const m of models.filter(m=>['25','26','27'].includes(m.id))){
 if(inventory.vehicles.some(v=>v.id===m.id))continue;
 const manufacturer_id=stableId('manufacturer',m.brand),brand_id=stableId('brand',m.brand);
 const maker=inventory.manufacturers.find(x=>x.id===manufacturer_id);if(!maker)throw Error('Constructeur existant requis : '+m.brand);
 const source_ids=[];
 for(const doc of m.documentation){const id=stableId('source',doc.url);source_ids.push(id);if(!inventory.sources.some(s=>s.id===id))inventory.sources.push({id,title:doc.title,url:doc.url,author:null,organization:doc.provider,published_at:doc.provider==='L’Aventure Peugeot'?'2020-07-09':null,consulted_at:doc.checkedAt??now(),type:doc.role==='primary'?(doc.provider==='Peugeot'||doc.provider==='Peugeot Motocycles'?'manufacturer_catalog':'museum'):'secondary',reliability:doc.role==='primary'?'A':'C',confirmed_fields:[],notes:'Référence consultée. Seuls les champs explicitement confirmés sont déclarés vérifiés.'})}
 for(const photo of [m.photo,...(m.gallery||[])].filter(Boolean)){const id=stableId('source',photo.sourcePage);source_ids.push(id);if(!inventory.sources.some(s=>s.id===id))inventory.sources.push({id,title:photo.fileTitle,url:photo.sourcePage,author:photo.author||null,organization:'Wikimedia Commons',published_at:null,consulted_at:photo.checkedAt,type:'iconographic',reliability:'C',confirmed_fields:[`${m.id}:media`],notes:'Source du visuel et de sa licence ; ne certifie pas le millésime de construction de cet exemplaire.'})}
 const related=m.id==='27';const v=createVehicle({id:m.id,name:m.model,aliases:related?['De Dion-Bouton Tricycle','Tricycle De Dion-Bouton 1895']:m.id==='25'?['Peugeot première moto 1898','Prototype Peugeot 1898']:['Peugeot Motobicyclette ZL 1901','Peugeot ZL 1901'],manufacturer_id,brand_id,origin_country:'France',category:related?'related':'motorcycle',subcategory:related?'motor_tricycle':'gasoline',propulsion:'gasoline',historical_status:m.id==='25'?'prototype':'production',existence_verified:true,variant:m.id==='25'?'Prototype présenté au salon de 1898, non produit':m.id==='26'?'Motobicyclette de production à moteur ZL':'Tricycle à essence',edition:m.id==='25'?'Présentation 1898':m.id==='26'?'Présentation 1901':'Modèle 1895',description:m.description,source_ids:[...new Set(source_ids)],legacy:structuredClone(m),media:{photo:m.photo,gallery:m.gallery,photoStatus:m.photoStatus,photoStatusNote:m.photoStatusNote},relationships:[{type:'related_to',target_id:related?'20':'24'}]});
 const source=inventory.sources.find(s=>source_ids.includes(s.id)&&s.organization===(related?'Cnam — Cnum':'L’Aventure Peugeot'));
 function claim(path,value,s=source,note=''){v.evidence.push({id:stableId('evidence',`${v.id}.${path}.${JSON.stringify(value)}`),field_path:path,value,source_ids:[s.id],confidence:s.reliability,verified:true,note,recorded_at:now()});s.confirmed_fields=[...new Set([...s.confirmed_fields,`${v.id}:${path}`])];}
 if(!related){
  v.presentation_date={...emptyDate(),year:m.presentation_year,precision:'exact',source_ids:[source.id],confidence:'A',verified:true,note:'Année de présentation publique au salon, explicitement distincte de l’année de construction et de commercialisation.'};
  claim('presentation_date',{year:m.presentation_year,precision:'exact'});claim('historical_status',v.historical_status,source,m.id==='25'?'La source indique que cette moto de salon ne sera pas produite.':'La source la décrit comme la première moto produite par Peugeot.');v.confidence.dates='A';
  v.technical.engine_type=m.id==='25'?'Moteur De Dion-Bouton':'Moteur suisse Zürcher et Lüthi (ZL)';claim('technical.engine_type',v.technical.engine_type);
  if(m.id==='26'){v.technical.displacement_cc=198;v.technical.transmission='Courroie';claim('technical.displacement_cc',198);claim('technical.transmission','Courroie');v.relationships.push({type:'related_to',target_id:'25'});}
  v.confidence.technical='A';
 }else{
  v.documented_construction={...emptyDate(),year:1895,precision:'exact',source_ids:[source.id],confidence:'A',verified:true,note:'Tricycle à essence De Dion-Bouton daté 1895 dans le catalogue du Cnam ; ne certifie pas la date du premier prototype.'};claim('documented_construction',{year:1895,precision:'exact'});
  const henry=inventory.sources.find(s=>source_ids.includes(s.id)&&s.organization==='The Henry Ford');v.dates.production_start_year={...emptyDate(),year:1895,precision:'exact',source_ids:[henry.id],confidence:'A',verified:true,note:'La notice muséale indique la production des premiers tricycles à essence en 1895. Son exemplaire conservé est une copie Cuddell de 1898, dont les spécifications ne sont pas reprises ici.'};claim('dates.production_start_year',{year:1895,precision:'exact'},henry);v.confidence.dates='A';
 }
 claim('propulsion','gasoline',source,related?'Le catalogue décrit un tricycle à essence.':'Motorisation des modèles présentés décrite par les archives de la marque.');
 v.history.push({at:now(),action:'integrate_confirmed_model',note:related?'Tricycle documenté choisi explicitement par l’utilisateur ; distinct de la bicyclette encore non identifiée.':'Modèle Peugeot documenté distinct ; l’ancienne référence 1899 est conservée sans réattribution arbitraire des favoris.'});
 inventory=insertVehicle(inventory,v);added.push(v.id);
}
inventory.catalogue_release='peugeot-1898-zl-1901-de-dion-tricycle-1895-v1';
const errors=validateInventory(inventory).filter(e=>e.severity==='error');if(errors.length)throw Error(JSON.stringify(errors,null,2));await writeFile('public/inventory.json',JSON.stringify(inventory,null,2)+'\n');console.log(JSON.stringify({added,total:inventory.vehicles.length}));

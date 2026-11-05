import {readFile,writeFile} from 'node:fs/promises';
import {createVehicle,emptyDate,stableId,now,validateInventory} from '../src/history/domain.js';
import {insertVehicle} from '../src/history/operations.js';
const read=async path=>JSON.parse(await readFile(path,'utf8'));
let inventory=await read('public/inventory.json');
const media=await read('public/motos.json');
const added=[];
for(const m of media.filter(m=>Number(m.id)>=18&&Number(m.id)<=24)){
 if(inventory.vehicles.some(v=>v.id===m.id))continue;
 const manufacturerId=stableId('manufacturer',m.brand),brandId=stableId('brand',m.brand);
 if(!inventory.manufacturers.some(x=>x.id===manufacturerId))inventory.manufacturers.push({id:manufacturerId,name:m.brand,official_name:null,aliases:m.id==='22'?['Bayliss, Thomas & Co.','British Excelsior']:[],origin_country:m.country,foundation_year:null,dissolution_year:null,history:m.id==='22'?'Marque britannique Excelsior de Bayliss, Thomas & Co. (Coventry), distincte des marques américaine et allemande. Identité juridique à compléter sur pièces.':'Identité historique à compléter ; aucune date de fondation ni forme juridique inventée.',official_website:null,brand_ids:[brandId],source_ids:[],ownership_events:[],confidence:'D'});
 if(!inventory.brands.some(x=>x.id===brandId))inventory.brands.push({id:brandId,name:m.brand,aliases:[],manufacturer_id:manufacturerId,history:[]});
 const sourceIds=[];
 for(const doc of m.documentation){const id=stableId('source',doc.url);sourceIds.push(id);if(!inventory.sources.some(s=>s.id===id))inventory.sources.push({id,title:doc.provider==='Cnam — Cnum'?'Catalogue du musée — Section DA, Transports sur route':doc.title,url:doc.url,author:null,organization:doc.provider,published_at:null,consulted_at:doc.checkedAt??now(),type:doc.role==='primary'?'museum':'secondary',reliability:doc.role==='primary'?'A':'C',confirmed_fields:[],notes:'Les faits confirmés sont énumérés au champ ; la présence du nom ne valide pas toute la fiche.'})}
 for(const photo of [m.photo,...(m.gallery||[])].filter(Boolean)){const id=stableId('source',photo.sourcePage);sourceIds.push(id);if(!inventory.sources.some(s=>s.id===id))inventory.sources.push({id,title:photo.fileTitle,url:photo.sourcePage,author:photo.author||null,organization:'Wikimedia Commons',published_at:null,consulted_at:photo.checkedAt,type:'iconographic',reliability:'C',confirmed_fields:[`${m.id}:media`],notes:'Correspondance visuelle et licence ; pas preuve de la construction au millésime proposé.'})}
 const unconfirmed=['20','24'].includes(m.id);
 let v=createVehicle({id:m.id,name:m.model,aliases:m.id==='18'?['Hildebrand & Wolfmüller','Hildebrand and Wolfmuller']:m.id==='22'?['Excelsior (Royaume-Uni)','British Excelsior 1896']:m.id==='23'?['Werner Motocyclette','Werner 1897']:m.id==='21'?['Millet Motorcycle','Pétrolette Millet']:[],manufacturer_id:manufacturerId,brand_id:brandId,origin_country:m.country,category:m.id==='20'?'related':'motorcycle',subcategory:m.id==='20'?'experimental_bicycle':m.propulsion==='Vapeur'?'steam':m.propulsion==='Essence'?'gasoline':'unspecified',propulsion:m.propulsion==='Vapeur'?'steam':m.propulsion==='Essence'?'gasoline':'unknown',historical_status:unconfirmed?'unconfirmed':m.id==='18'||m.id==='22'?'production':'prototype',existence_verified:!unconfirmed&&m.id!=='22',variant:m.id==='19'?'Second modèle, distinct du vélocipède des années 1860':m.id==='22'?'Première génération britannique':m.id==='23'?'Premier type à moteur haut':null,edition:m.id==='22'?'Royaume-Uni · 1896':null,description:m.description,inventory_reference:m.inventory_reference,requested_year:m.requested_year,source_ids:[...new Set(sourceIds)],legacy:structuredClone(m),media:{photo:m.photo,gallery:m.gallery,photoStatus:m.photoStatus,photoStatusNote:m.photoStatusNote}});
 const wiki=inventory.sources.find(s=>sourceIds.includes(s.id)&&s.organization==='Wikipedia');
 const primary=inventory.sources.find(s=>sourceIds.includes(s.id)&&s.reliability==='A');
 function assertion(path,value,source,verified=false,note=''){v.evidence.push({id:stableId('evidence',`${v.id}.${path}.${JSON.stringify(value)}`),field_path:path,value,source_ids:source?[source.id]:[],confidence:source?.reliability||'D',verified,note,recorded_at:now()});if(verified&&source&&!source.confirmed_fields.includes(`${v.id}:${path}`))source.confirmed_fields.push(`${v.id}:${path}`)}
 function date(key,value,source,verified=false,note=''){v.dates[key]={...emptyDate(),...value,source_ids:source?[source.id]:[],confidence:source?.reliability||'D',verified,note};assertion('dates.'+key,value,source,verified,note)}
 assertion('requested_year',m.requested_year,null,false,'Année proposée dans la liste utilisateur ; référence conservée, sans assimilation automatique à une construction.');
 if(m.id==='18'){
  v.documented_construction={...emptyDate(),year:1894,precision:'approximate',source_ids:[primary.id],confidence:'A',verified:true,note:'Exemplaire conservé par The Henry Ford, daté circa 1894. Ne prouve pas la date du premier prototype.'};
  assertion('documented_construction',{year:1894,precision:'approximate'},primary,true,v.documented_construction.note);
  date('production_start_year',{year:1894,precision:'exact'},wiki,false,'Début de production du modèle selon la source secondaire ; ne vaut pas date de conception.');
  assertion('historical_status','production',primary,true,'Le musée décrit explicitement une vente au public sur une base de production en série.');
  v.technical.cylinders=2;assertion('technical.cylinders',2,primary,true,'Le musée décrit deux cylindres et des bielles directement reliées à la roue arrière.');v.confidence.technical='A';v.confidence.dates='C';
 }
 if(m.id==='19'){
  date('prototype_year',{year:null,earliest:1884,latest:1895,precision:'conflicting'},primary,false,'Le Smithsonian et l’AMA indiquent un second cycle construit en 1895 ; la page secondaire contient les datations divergentes 1884 et 1894.');
  assertion('dates.prototype_year',{year:1895,precision:'exact'},primary,true,'La notice Smithsonian mentionne une autre motocyclette construite en 1895.');
  const ama=inventory.sources.find(s=>sourceIds.includes(s.id)&&s.organization==='AMA Motorcycle Hall of Fame');assertion('dates.prototype_year',{year:1895,precision:'exact'},ama,true,'L’AMA décrit une version améliorée construite en 1895.');
  assertion('dates.prototype_year',{year:1894,precision:'exact'},wiki,false,'Introduction de la source secondaire, datation divergente.');assertion('dates.prototype_year',{year:1884,precision:'exact'},wiki,false,'Section du second cycle de la source secondaire, datation divergente.');
  v.contradictions.push({id:'roper-second-dating',field_path:'dates.prototype_year',status:'open',description:'1895 est attesté par le Smithsonian et l’AMA, tandis que la page secondaire comporte des datations 1884 et 1894. Le premier modèle des années 1860 est exclu de cette fiche.',source_ids:[primary.id,ama.id,wiki.id],resolution:null});v.technical.engine_type='Machine à vapeur';assertion('technical.engine_type','Machine à vapeur',primary,true);v.confidence.technical='A';
 }
 if(m.id==='20')v.contradictions.push({id:'de-dion-bicycle-identity',field_path:'identity',status:'open',description:'La liste propose une bicyclette motorisée en 1895 ; les notices muséales consultées identifient des tricycles. La bicyclette précise et son année de construction restent non confirmées.',source_ids:sourceIds.filter(id=>inventory.sources.find(s=>s.id===id)?.type!=='iconographic'),resolution:null});
 if(m.id==='21'){
  date('design_year',{year:1892,precision:'exact'},wiki,false,'Conception selon la source secondaire.');date('prototype_year',{year:1892,precision:'exact'},wiki,false,'Prototype ayant roulé en 1892 selon la source secondaire.');
  v.documented_construction={...emptyDate(),year:1893,precision:'exact',source_ids:[primary.id],confidence:'A',verified:true,note:'Le catalogue du Cnam identifie une motocyclette de Félix Millet datée de 1893, distincte de la première réalisation de 1892 citée par Wikipédia.'};assertion('documented_construction',{year:1893,precision:'exact'},primary,true,v.documented_construction.note);
  assertion('competition_year',1895,wiki,false,'La source secondaire situe une participation à Paris–Bordeaux–Paris en 1895 ; cette date n’est pas utilisée comme construction.');v.confidence.dates='C';
 }
 if(m.id==='22'){date('prototype_year',{year:1896,precision:'exact'},wiki,false,'Première moto britannique Excelsior selon la source secondaire, à confirmer sur archive contemporaine.');date('production_start_year',{year:1896,precision:'exact'},wiki,false,'La source secondaire situe le début de production en 1896.');date('commercialization_year',{year:1896,precision:'exact'},wiki,false,'Modèle proposé au public selon la source secondaire.');v.confidence.dates='C';}
 if(m.id==='23'){date('design_year',{year:1897,precision:'exact'},primary,true,'Le Science Museum situe l’évolution de ce premier type de conception en 1897.');date('prototype_year',{year:1897,precision:'exact'},wiki,false,'Date du premier type selon la source secondaire ; l’exemplaire détaillé par le musée est de 1899.');v.confidence.dates='C';}
 if(m.id==='24')v.contradictions.push({id:'peugeot-1899-identity',field_path:'identity_and_dates',status:'open',description:'La référence proposée est 1899 ; Peugeot Motocycles distingue une première moto en 1898 et une motobicyclette ZL en 1901. Peugeot Automobile retient aussi 1901 pour sa motobicyclette. L’objet précis de 1899 n’est pas identifié.',source_ids:sourceIds.filter(id=>inventory.sources.find(s=>s.id===id)?.type!=='iconographic'),resolution:null});
 v.history.push({at:now(),action:'add_requested_historical_reference',reference:m.inventory_reference,requested_year:m.requested_year,note:'Désignation et année proposées conservées séparément des faits vérifiés. Aucun chiffre technique inconnu n’est inventé.'});
 inventory=insertVehicle(inventory,v);added.push(v.id);
}
const errors=validateInventory(inventory).filter(e=>e.severity==='error');if(errors.length)throw Error(JSON.stringify(errors,null,2));
inventory.catalogue_release='early-references-005-011-v1';
await writeFile('public/inventory.json',JSON.stringify(inventory,null,2)+'\n');
console.log(JSON.stringify({added,total:inventory.vehicles.length,manufacturers:inventory.manufacturers.length}));

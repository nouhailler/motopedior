import {readFile,writeFile} from 'node:fs/promises';
import {createVehicle,emptyDate,stableId,now,validateInventory} from '../src/history/domain.js';
import {insertVehicle} from '../src/history/operations.js';
const read=async path=>JSON.parse(await readFile(path,'utf8'));
let inventory=await read('public/inventory.json');const models=await read('public/motos.json');const added=[];
const stamp='2026-11-05';
for(const m of models.filter(m=>Number(m.id)>=28&&Number(m.id)<=34)){
 if(inventory.vehicles.some(v=>v.id===m.id))continue;
 const pending=['28','29','30'].includes(m.id),tricycle=['33','34'].includes(m.id),bicycle=['28','30','31','32'].includes(m.id);
 const mid=stableId('manufacturer',m.brand),bid=stableId('brand',m.id==='33'?'Ariel':m.brand);
 if(!inventory.manufacturers.some(x=>x.id===mid))inventory.manufacturers.push({id:mid,name:m.brand,official_name:null,aliases:[],origin_country:m.country,foundation_year:null,dissolution_year:null,history:pending?'Attribution candidate à vérifier.':'Identité associée à la notice muséale ; histoire juridique non complétée.',official_website:null,brand_ids:[bid],source_ids:[],ownership_events:[],confidence:pending?'D':'A'});
 if(!inventory.brands.some(x=>x.id===bid))inventory.brands.push({id:bid,name:m.id==='33'?'Ariel':m.brand,aliases:[],manufacturer_id:mid,history:[]});
 const sources=m.documentation.map(doc=>{
  const id=stableId('source',doc.url);let s=inventory.sources.find(s=>s.id===id);if(!s){
   const level=doc.provider==='IMechE Archive and Library'||doc.provider==='Vintage Motor Cycle Club'||doc.provider==='François-Marie Dumas'?'B':doc.role==='primary'?'A':doc.provider==='Antique Motorcycle and Auto Museum'?'B':'C';
   s={id,title:doc.title,url:doc.url,author:doc.provider==='New York State Museum'?'Geoffrey N. Stein':doc.provider==='IMechE Archive and Library'?'Roger Bird':null,organization:doc.provider,published_at:doc.provider==='New York State Museum'?'2001':doc.provider==='National Motorcycle Museum'?'2018-09-28':doc.provider==='IMechE Archive and Library'?'2015-12-07':null,consulted_at:stamp,type:doc.url.includes('patents.google')?'patent':doc.provider==='New York State Museum'?'historical_book':doc.provider==='François-Marie Dumas'?'specialist_press':doc.provider==='Ariel Motor Company'?'manufacturer_catalog':doc.provider==='Antique Motorcycle and Auto Museum'?'documented_private_collection':doc.provider==='IMechE Archive and Library'?'archive':level==='A'?'museum':'secondary',reliability:level,confirmed_fields:[],notes:'Les champs confirmés sont explicités par assertion. Une référence de brevet ne prouve pas une construction.'};inventory.sources.push(s);
  }return s;
 });
 const v=createVehicle({id:m.id,name:m.model,aliases:m.id==='28'?['Geneva Steam Bicycle']:m.id==='29'?['Marks Motorcycle','Roy C. Marks Moto Bicycle']:m.id==='30'?['Pennington Motor Bicycle','Kane-Pennington Motor Bicycle']:m.id==='31'?['Perks & Birch Motor-Wheel','Perks and Birch Autowheel']:m.id==='32'?['Thomas Auto-Bi','Thomas Design Number Two']:m.id==='33'?['Ariel Tricycle 1898']:['Clarke Gasoline Tricycle','Autocar No. 1'],manufacturer_id:mid,brand_id:bid,origin_country:m.country,category:tricycle||bicycle?'related':'motorcycle',subcategory:tricycle?'motor_tricycle':bicycle?'motor_velocipede':'unspecified',propulsion:pending||m.id==='31'?'unknown':'gasoline',historical_status:pending?'unconfirmed':m.id==='34'?'experimental':m.id==='32'?'prototype':m.id==='31'?'unconfirmed':'production',existence_verified:!pending,description:m.description,source_ids:sources.map(s=>s.id),requested_year:m.requested_year,legacy:structuredClone(m),media:{photo:m.photo,gallery:m.gallery,photoStatus:m.photoStatus,photoStatusNote:m.photoStatusNote}});
 const primary=sources[0];
 function claim(path,value,source=primary,note=''){
  const verified=!pending&&source.type!=='iconographic'&&source.type!=='patent';
  v.evidence.push({id:stableId('evidence',`${v.id}.${path}.${JSON.stringify(value)}`),field_path:path,value,source_ids:[source.id],confidence:verified?source.reliability:'D',verified,note,recorded_at:stamp});
  if(verified)source.confirmed_fields=[...new Set([...source.confirmed_fields,`${v.id}:${path}`])];
 }
 function date(path,year,source=primary,note=''){
  const d={...emptyDate(),year,precision:'exact',source_ids:[source.id],confidence:source.reliability,verified:true,note};
  if(path==='documented_construction')v.documented_construction=d;else v.dates[path]=d;
  claim(path==='documented_construction'?path:'dates.'+path,{year,precision:'exact'},source,note);
 }
 function tech(key,value,source=primary,note=''){v.technical[key]=value;claim('technical.'+key,value,source,note)}
 if(pending){
  v.review={status:'in_review',reviewed_at:null,note:'Fiche candidate : existence historique précise et construction non validées. Année proposée séparée des dates typées.'};
  if(m.id==='28'){claim('origin_country','États-Unis');v.justifications.push({code:'candidate_only',note:'VMCC : Geneva USA 1896 ; F.-M. Dumas identifie la photo comme reconstruction. Catalogue Guggenheim et page AMCA archivés inaccessibles lors de cette recherche.',source_ids:sources.map(s=>s.id)});}
  if(m.id==='29')v.justifications.push({code:'candidate_only',note:'Ne pas transformer la période 1896–1901 citée dans les listes en années certaines ni en production. Attribution au constructeur encore à confirmer.',source_ids:sources.map(s=>s.id)});
  if(m.id==='30')v.justifications.push({code:'candidate_only',note:'Brevet US570440A délivré en 1896, application 1893 : non attribué comme date de brevet d’un prototype précis faute de correspondance établie. Le tricycle Autocar de Beaulieu est exclu.',source_ids:sources.map(s=>s.id)});
 }else{
  claim('existence_verified',true);claim('origin_country',m.country);claim('manufacturer_id',mid);claim('category',v.category);claim('subcategory',v.subcategory);if(m.id!=='31')claim('propulsion','gasoline');
  if(m.id==='31'){
   date('documented_construction',1899,primary,'Exemplaire du National Motor Museum ; ne certifie pas la date du premier prototype.');
   tech('cylinders',1);tech('displacement_cc',222);tech('top_speed_kmh',28.97);tech('engine_type','Monocylindre intégré à la roue');
   v.contradictions.push({id:stableId('conflict','perks-rights'),field_path:'history.rights_transfer',status:'open',description:'Le National Motor Museum date l’acquisition des droits par Singer de 1901 ; Louwman la situe un an après la présentation de 1899, soit 1900. Les deux indications sont conservées, sans arbitrage.',values:[1901,1900],source_ids:sources.map(s=>s.id),resolution:null});
   v.review={status:'in_review',reviewed_at:null,note:'Exemplaire et caractéristiques muséales documentés ; statut de production 1899 et cession des droits à éclaircir.'};
   v.confidence={global:'D',dates:'A',technical:'A',production:'D'};
  }
  if(m.id==='32'){
   date('prototype_year',1900,primary,'Stein, p. 144–146 : prototype annoncé en septembre 1900 et machines observées par un journaliste. Ne pas confondre avec une simple annonce de brevet.');
   date('commercialization_year',1901,primary,'La famille Auto-Bi est destinée à la saison 1901 ; le No. 2 de production remplace le galet du prototype par une courroie à la roue. La seconde source situe la disponibilité fin 1901.');
   tech('engine_type','Monocylindre à quatre temps');tech('cylinders',1);tech('cooling','Air');tech('transmission','Courroie vers galet sur le pneu arrière (prototype Design Number Two)');
   v.variant='Prototype Design Number Two de 1900 ; version commerciale modifiée en 1901';
   v.confidence={global:'A',dates:'A',technical:'A',production:'A'};
  }
  if(m.id==='33'){
   date('documented_construction',1898,primary,'Exemplaire Ariel Tricycle daté de 1898 par le National Motor Museum.');
   date('commercialization_year',1898,sources[1],'La chronologie officielle Ariel classe le tricycle parmi les véhicules commercialement disponibles en 1898.');
   tech('engine_type','Monocylindre De Dion-Bouton');tech('cylinders',1);tech('displacement_cc',239);tech('top_speed_kmh',32.19);tech('cooling','Culasse refroidie par eau',sources[1],'Information limitée à la culasse : ne pas généraliser à tout le moteur.');
   v.variant='Exemplaire muséal 239 cm³ de 1898';v.confidence={global:'A',dates:'A',technical:'A',production:'A'};
  }
  if(m.id==='34'){
   date('documented_construction',1897,primary,'Machine construite par Louis S. Clarke en 1897, conservée au Smithsonian.');
   tech('engine_type','Monocylindre à essence');tech('cylinders',1);tech('cooling','Air');tech('transmission','Engrenage direct vers le différentiel arrière');tech('starting','Pédales');
   v.confidence={global:'A',dates:'A',technical:'A',production:'A'};
  }
  if(m.id!=='31'){claim('historical_status',v.historical_status);v.review={status:'verified',reviewed_at:stamp,note:'Existence, classification et valeurs renseignées contrôlées ; les champs non documentés restent nulls. La validation ne prétend pas à l’exhaustivité des caractéristiques.'};}
 }
 for(const photo of [m.photo,...(m.gallery||[])].filter(Boolean)){
  const id=stableId('source',photo.sourcePage);v.source_ids.push(id);if(!inventory.sources.some(s=>s.id===id))inventory.sources.push({id,title:photo.fileTitle,url:photo.sourcePage,author:photo.author||null,organization:'Wikimedia Commons',published_at:null,consulted_at:photo.checkedAt,type:'iconographic',reliability:'C',confirmed_fields:[`${m.id}:media`],notes:'Identification et licence de ce fichier uniquement ; ne valide pas les caractéristiques techniques.'});
 }
 v.history.push({at:stamp,action:pending?'add_research_candidate':'integrate_1890_1900',note:pending?'Candidat conservé sans construction attestée ni spécification empruntée.':'Ajout documenté après comparaison avec les 27 fiches existantes.'});
 inventory=insertVehicle(inventory,v);added.push(v.id);
}
const refs=[
 ['005','Hildebrand & Wolfmüller','1894','18','existing','Déjà présent ; exemplaire circa 1894.'],
 ['006','Millet Motorcycle','1892–1895','21','existing','Déjà présent ; prototype 1892 secondaire et exemplaire Cnam 1893 distincts.'],
 ['007','Werner Motocyclette','1897','23','existing','Premier type existant ; confirmation primaire de 1897 encore requise.'],
 ['008','Peugeot première motocyclette','1898','25','existing','Présentation 1898 documentée ; construction et commercialisation distinctes et inconnues.'],
 ['009','Excelsior Motor-Bicycle','1896','22','existing','Modèle britannique existant ; datation primaire à compléter.'],
 ['010','Geneva Steam Bicycle','1896','28','pending','Datation et authenticité à confirmer ; reconstruction signalée.'],
 ['011','Roper Steam Bicycle (second modèle)','1895–1896','19','existing','Second modèle existant ; contradictions antérieures conservées, 1896 ne remplace pas automatiquement la construction.'],
 ['012','Marks Motorcycle','1896–1901','29','pending','Identité, origine et construction exactes non confirmées.'],
 ['013','Pennington Motor Bicycle','Années 1890','30','pending','Brevet et mention de prototypes insuffisants pour identifier précisément la machine américaine.'],
 ['014','Perks & Birch Motor-Wheel','1899','31','added','Exemplaire 1899 et caractéristiques muséales ; cession Singer contradictoire.'],
 ['015','Thomas Auto-Bi','1900','32','added','Prototype 1900, commercialisation de la famille modifiée en 1901.'],
 ['016','De Dion-Bouton Tricycle','1897','27','existing','Famille déjà documentée dès 1895. Aucune variante distincte de 1897 démontrée : pas de nouvelle fiche ni de spécifications transposées.'],
 ['017','Ariel Tricycle','1898','33','added','Exemplaire daté 1898, constructeur Components Ltd ; tricycle séparé.'],
 ['018','Clarke Gasoline Tricycle','1897','34','added','Exemplaire Smithsonian de Louis S. Clarke, 1897 ; tricycle expérimental séparé.']
].map(([reference,name,requested_year,vehicle_id,decision,note])=>({reference,name,requested_year,vehicle_id,decision,note}));
inventory.research_batches??=[];
if(!inventory.research_batches.some(b=>b.id==='historical-1890-1900-v1'))inventory.research_batches.push({id:'historical-1890-1900-v1',title:'Inventaire 1890–1900',consulted_at:stamp,start:1890,end:1900,references:refs});
if(added.length||!inventory.catalogue_release)inventory.catalogue_release='historical-1890-1900-v1';
const errors=validateInventory(inventory).filter(e=>e.severity==='error');if(errors.length)throw Error(JSON.stringify(errors,null,2));
await writeFile('public/inventory.json',JSON.stringify(inventory,null,2)+'\n');console.log(JSON.stringify({added,total:inventory.vehicles.length,candidates:refs.filter(r=>r.decision==='pending').length,reused:refs.filter(r=>r.decision==='existing').length}));

import {constructionBounds,constructionDate,PROPULSIONS} from './domain.js';
const overlaps=(bounds,start,end)=>bounds&&bounds.start<=end&&bounds.end>=start;
export function inConstructionPeriod(v,start,end){return !!overlaps(constructionBounds(v),start,end)}
export function isDocumentedConstruction(v,start,end){
 const d=constructionDate(v)?.verified?constructionDate(v):v.documented_construction;const b=d?.year!=null?{start:d.year,end:d.year}:d?.earliest!=null?{start:d.earliest,end:d.latest}:null;
 return !!(v.existence_verified&&d?.verified&&d.precision!=='conflicting'&&b&&b.start>=start&&b.end<=end);
}
export function wheelGroup(v){return v.subcategory==='motor_tricycle'?'Tricycles motorisés':['motor_velocipede','experimental_bicycle'].includes(v.subcategory)?'Vélocipèdes motorisés':v.category==='motorcycle'?'Motocyclettes à deux roues':'Autres véhicules apparentés'}
// Count model families once. A variant is excluded when its parent is already present.
export function modelFamilies(vehicles){const ids=new Set(vehicles.map(v=>v.id));return vehicles.filter(v=>!v.relationships.some(r=>['variant_of','competition_version_of','reissue_of'].includes(r.type)&&ids.has(r.target_id)))}
export function periodStats(inventory,start=1890,end=1900){
 const batch=inventory.research_batches?.find(b=>b.start===start&&b.end===end),ids=new Set(batch?.references.map(r=>r.vehicle_id).filter(Boolean)||[]);
 const cohort=modelFamilies(inventory.vehicles.filter(v=>ids.has(v.id)||inConstructionPeriod(v,start,end)||overlaps(v.presentation_date?.year?{start:v.presentation_date.year,end:v.presentation_date.year}:null,start,end)));
 const rawDocumented=inventory.vehicles.filter(v=>isDocumentedConstruction(v,start,end));const documented=modelFamilies(rawDocumented);const pendingCandidates=batch?.references.filter(r=>r.decision==='pending'&&!r.vehicle_id).length||0;
 const count=(list,fn)=>list.reduce((a,v)=>{const k=fn(v);a[k]=(a[k]||0)+1;return a},{});
 const datedWithin=(v,k)=>{const d=v.dates[k],lo=d.year??d.earliest,hi=d.year??d.latest;return d.verified&&d.precision!=='conflicting'&&lo!==null&&hi!==null&&lo>=start&&hi<=end};
 return {start,end,cohort:cohort.length,documented:documented.length,motorcycles:documented.filter(v=>v.category==='motorcycle').length,motorizedBicycles:documented.filter(v=>['motor_velocipede','experimental_bicycle'].includes(v.subcategory)).length,tricycles:documented.filter(v=>v.subcategory==='motor_tricycle').length,prototypes:documented.filter(v=>v.historical_status==='prototype').length,experimental:documented.filter(v=>v.historical_status==='experimental').length,commercialized:documented.filter(v=>datedWithin(v,'commercialization_year')).length,production:documented.filter(v=>datedWithin(v,'production_start_year')).length,verified:cohort.filter(v=>v.review.status==='verified').length,needsResearch:cohort.filter(v=>v.review.status!=='verified').length+pendingCandidates,pendingCandidates,examinedReferences:batch?.references.length||0,variants:rawDocumented.filter(v=>v.relationships.some(r=>['variant_of','competition_version_of','reissue_of'].includes(r.type))).length,competition:rawDocumented.filter(v=>v.specializations.includes('competition')||v.relationships.some(r=>r.type==='competition_version_of')).length,manufacturers:count(documented,v=>inventory.manufacturers.find(m=>m.id===v.manufacturer_id)?.name||'Inconnu'),uncertainConstruction:cohort.filter(v=>!isDocumentedConstruction(v,start,end)).length,countries:count(documented,v=>v.origin_country||'Inconnu'),propulsions:count(documented,v=>PROPULSIONS[v.propulsion]),groups:count(documented,wheelGroup),vehicleIds:documented.map(v=>v.id)};
}

// Presentation is an explicit alternate filter basis, never a prototype/construction year.
export function filterHistoricalVehicles(inventory,{query='',reference='',from=1867,to=new Date().getFullYear(),year='',decade='',maker='',country='',propulsion='',status='',group='',subcategory='',use='',precision='',includeUnknown=true,dateBasis='construction'}={}){
 const start=Number(year||decade||from||1867),end=year?Number(year):decade?Number(decade)+9:Number(to||new Date().getFullYear());
 const basis=v=>constructionBounds(v)||(dateBasis==='documentary'&&!year&&v.presentation_date?.year?{start:v.presentation_date.year,end:v.presentation_date.year}:null);
 return inventory.vehicles.filter(v=>{
  const refs=(inventory.research_batches||[]).flatMap(b=>b.references.filter(r=>r.vehicle_id===v.id).map(r=>({...r,batchId:b.id})));
  const text=[v.name,...v.aliases,inventory.manufacturers.find(m=>m.id===v.manufacturer_id)?.name,v.legacy?.brand,v.inventory_reference,v.requested_year,...refs.flatMap(r=>[r.reference,r.name,r.requested_year])].join(' ').toLocaleLowerCase('fr');
  const matchesReference=!reference||(reference==='all_early'?!!v.inventory_reference:reference.startsWith('batch:')?refs.some(r=>r.batchId===reference.slice(6)):v.inventory_reference===reference);
  const b=basis(v);return (!query||text.includes(query.toLocaleLowerCase('fr')))&&matchesReference&&(!maker||v.manufacturer_id===maker)&&(!country||v.origin_country===country)&&(!propulsion||v.propulsion===propulsion)&&(!status||v.historical_status===status)&&(!group||v.category===group)&&(!subcategory||v.subcategory===subcategory)&&(!use||v.specializations.includes(use))&&(!precision||constructionDate(v).precision===precision)&&(b?overlaps(b,start,end):includeUnknown&&!year&&!decade);
 }).sort((a,b)=>(basis(a)?.start??Infinity)-(basis(b)?.start??Infinity)||a.name.localeCompare(b.name,'fr'));
}

export function filterResearchReferences(batch,{query='',scope=''}={}){
 return batch.references.filter(r=>(!query||[r.name,r.proposed_manufacturer,r.requested_year,r.note].join(' ').toLocaleLowerCase('fr').includes(query.toLocaleLowerCase('fr')))&&(!scope||(scope==='related'?r.group==='related':scope==='documented'?r.decision!=='pending':r.decision===scope)));
}

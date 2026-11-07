import {clone,emptyDate,emptyTechnical,constructionBounds} from './domain.js';
export function annualAttestations(inventory,vehicleId,start,end){
 return (inventory.construction_attestations||[]).filter(a=>a.vehicle_id===vehicleId&&a.verified===true&&['A','B'].includes(a.confidence)&&a.date?.verified&&a.date.precision==='exact'&&a.date.year>=start&&a.date.year<=end&&a.source_ids.length&&a.source_ids.every(id=>inventory.sources.some(s=>s.id===id&&['A','B'].includes(s.reliability)&&s.reliability<=a.confidence&&!['patent','iconographic'].includes(s.type))));
}
// A scoped read view prevents old specifications/status from being projected onto a later object.
export function attestedVehicle(inventory,v,start,end){
 const b=constructionBounds(v);if(b&&b.start>=start&&b.end<=end)return v;
 const a=annualAttestations(inventory,v.id,start,end)[0];if(!a)return v;
 return {...v,dates:{...v.dates,prototype_year:emptyDate()},documented_construction:clone(a.date),technical:clone(a.technical||emptyTechnical()),mechanical_details:undefined,historical_status:a.historical_status,specializations:clone(a.specializations||[]),confidence:{global:a.confidence,dates:a.confidence,technical:a.confidence,production:a.confidence},review:{...v.review,status:'verified'}};
}
export function appendAttestations(current,incoming){
 let changed=false;const skipped=[];
 for(const a of incoming.construction_attestations||[]){
  if(current.construction_attestations?.some(old=>old.id===a.id))continue;
  const sourceConflict=a.source_ids.some(id=>{const local=current.sources.find(s=>s.id===id),remote=incoming.sources.find(s=>s.id===id);if(!remote)return true;const content=s=>{const{confirmed_fields,...rest}=s;return rest};return local&&JSON.stringify(content(local))!==JSON.stringify(content(remote))});
  if(sourceConflict||!current.vehicles.some(v=>v.id===a.vehicle_id)){skipped.push(a.id);continue}
  for(const id of a.source_ids)if(!current.sources.some(s=>s.id===id))current.sources.push(clone(incoming.sources.find(s=>s.id===id)));
  current.construction_attestations??=[];current.construction_attestations.push(clone(a));changed=true;
 }
 return {changed,skipped};
}

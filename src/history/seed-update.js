import {clone,duplicateCandidates,now,validateInventory} from './domain.js';
// Append new editorial records without replacing local reviews, sources or identifiers.
export function appendSeedAdditions(current,seed){
 const next=clone(current);const added=[],skipped=[];
 for(const vehicle of seed.vehicles){
  if(next.vehicles.some(v=>v.id===vehicle.id)||next.redirects?.[vehicle.id])continue;
  const staged=clone(next);
  for(const table of ['manufacturers','brands','sources'])for(const record of seed[table])if(!staged[table].some(row=>row.id===record.id))staged[table].push(clone(record));
  const sourceConflict=vehicle.source_ids.some(id=>{const local=next.sources.find(s=>s.id===id),remote=seed.sources.find(s=>s.id===id);return local&&remote&&JSON.stringify(local)!==JSON.stringify(remote)});
  const collisions=duplicateCandidates(vehicle,staged);
  if(sourceConflict||collisions.some(c=>c.kind==='duplicate')){skipped.push({id:vehicle.id,reason:sourceConflict?'Source locale modifiée à préserver':'Doublon potentiel à réviser'});continue}
  staged.vehicles.push(clone(vehicle));
  if(validateInventory(staged).some(e=>e.severity==='error')){skipped.push({id:vehicle.id,reason:'Validation structurelle à réviser'});continue}
  for(const table of ['manufacturers','brands','sources','vehicles'])next[table]=staged[table];added.push(vehicle.id);
 }
 if(added.length){next.seed_updates??=[];next.seed_updates.push({at:now(),added,skipped});next.history.push({at:now(),action:'append_editorial_seed',vehicle_ids:added,note:'Ajouts éditoriaux uniquement ; fiches locales existantes inchangées.'})}
 return {inventory:added.length?next:current,added,skipped};
}

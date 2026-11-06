import {clone,duplicateCandidates,now,validateInventory} from './domain.js';
// Append new editorial records without replacing local reviews, sources or identifiers.
const sourceContent=source=>{const {confirmed_fields,...content}=source;return content};
export function appendSeedAdditions(current,seed){
 const next=clone(current);const added=[],skipped=[];let metadataChanged=false;
 for(const batch of seed.research_batches||[]){if(!next.research_batches?.some(b=>b.id===batch.id)){next.research_batches??=[];next.research_batches.push(clone(batch));for(const id of batch.references.flatMap(r=>r.source_ids||[])){if(!next.sources.some(s=>s.id===id)){const source=seed.sources.find(s=>s.id===id);if(source)next.sources.push(clone(source))}}metadataChanged=true}}
 for(const vehicle of seed.vehicles){
  if(next.vehicles.some(v=>v.id===vehicle.id)||next.redirects?.[vehicle.id])continue;
  const staged=clone(next);
  for(const table of ['manufacturers','brands','sources'])for(const record of seed[table]){const existing=staged[table].find(row=>row.id===record.id);if(!existing)staged[table].push(clone(record));else if(table==='sources'&&JSON.stringify(sourceContent(existing))===JSON.stringify(sourceContent(record)))existing.confirmed_fields=[...new Set([...existing.confirmed_fields,...record.confirmed_fields])];}
  const sourceConflict=vehicle.source_ids.some(id=>{const local=next.sources.find(s=>s.id===id),remote=seed.sources.find(s=>s.id===id);return local&&remote&&JSON.stringify(sourceContent(local))!==JSON.stringify(sourceContent(remote))});
  const collisions=duplicateCandidates(vehicle,staged);
  if(sourceConflict||collisions.some(c=>c.kind==='duplicate')){skipped.push({id:vehicle.id,reason:sourceConflict?'Source locale modifiée à préserver':'Doublon potentiel à réviser'});continue}
  staged.vehicles.push(clone(vehicle));
  if(validateInventory(staged).some(e=>e.severity==='error')){skipped.push({id:vehicle.id,reason:'Validation structurelle à réviser'});continue}
  for(const table of ['manufacturers','brands','sources','vehicles'])next[table]=staged[table];added.push(vehicle.id);
 }
 if(added.length){next.seed_updates??=[];next.seed_updates.push({at:now(),added,skipped});next.history.push({at:now(),action:'append_editorial_seed',vehicle_ids:added,note:'Ajouts éditoriaux uniquement ; fiches locales existantes inchangées.'})}
 if(metadataChanged&&!added.length)next.history.push({at:now(),action:'append_research_index',note:'Index documentaire ajouté sans remplacer les fiches locales.'});
 return {inventory:added.length||metadataChanged?next:current,added,skipped,changed:!!(added.length||metadataChanged)};
}

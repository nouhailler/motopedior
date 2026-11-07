import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {integrateHistoricalBatch} from './add-1911-1920.mjs';
import {emptyDate,stableId,validateInventory} from '../src/history/domain.js';
export function integrate1921(current,curated,batch,photos=[]){
 const result=integrateHistoricalBatch(current,curated,batch,photos,{start:1921,end:1921}),inventory=result.inventory;
 const annual=[];
 for(const input of curated.attestations||[]){
  if(inventory.construction_attestations?.some(a=>a.id===input.id))continue;
  if(input.year!==1921||!inventory.vehicles.some(v=>v.id===input.vehicle_id))throw Error('Attestation annuelle hors du périmètre ou fiche absente');
  const source_ids=input.sources.map(k=>{const s=curated.sources[k];if(!s||!['A','B'].includes(s.reliability)||['patent','iconographic'].includes(s.type))throw Error('Preuve annuelle insuffisante');const id=stableId('source',s.url);if(!inventory.sources.some(s=>s.id===id))inventory.sources.push({id,...structuredClone(s),confirmed_fields:[],notes:'Preuve de continuité annuelle ; ne fixe pas la première construction.'});return id});
  const confidence=input.sources.map(k=>curated.sources[k].reliability).sort().at(-1);
  inventory.construction_attestations??=[];
  inventory.construction_attestations.push({id:input.id,vehicle_id:input.vehicle_id,verified:true,date:{...emptyDate(),year:1921,precision:'exact',source_ids,confidence,verified:true,note:input.note},source_ids,confidence,historical_status:input.historical_status,specializations:input.specializations||[],note:input.note,recorded_at:'2026-11-07'});annual.push(input.id);
 }
 if(annual.length)inventory.history.push({at:'2026-11-07',action:'append_annual_construction',attestation_ids:annual,note:'Continuités de construction documentées, sans réécrire les fiches antérieures.'});
 const errors=validateInventory(inventory).filter(i=>i.severity==='error');if(errors.length)throw Error(JSON.stringify(errors));
 return {...result,inventory,annual};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const read=async p=>JSON.parse(await readFile(p,'utf8'));
 const r=integrate1921(await read('public/inventory.json'),await read('data/verified-1921.json'),await read('data/research-1921.json'),await read('public/motos.json'));
 await writeFile('public/inventory.json',JSON.stringify(r.inventory,null,2)+'\n');console.log(JSON.stringify({added:r.added.length,annual:r.annual.length,total:r.inventory.vehicles.length,pending:r.pending,references:r.references}));
}

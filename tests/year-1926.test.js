import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {integrate1926} from '../scripts/add-1926.mjs';
import {validateInventory} from '../src/history/domain.js';
import {filterHistoricalVehicles,periodStats} from '../src/history/period.js';
import {exportJSON,parseInventoryJSON,exportCSV,parseInventoryCSV} from '../src/history/serialization.js';
const read=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
const [before,actual,curated,batch]=await Promise.all([
 '../data/migrations/catalogue-114-before-1926.json','../public/inventory.json','../data/verified-1926.json','../data/research-1926.json'
].map(read));
const vehicle=id=>actual.vehicles.find(v=>v.id===id);

test('1926 preserves older records and is idempotent',()=>{
 for(const table of ['vehicles','manufacturers','brands'])assert.deepEqual(actual[table].slice(0,before[table].length),before[table]);
 assert.deepEqual(integrate1926(actual,curated,batch).inventory,actual);
 assert.deepEqual(validateInventory(actual).filter(i=>i.severity==='error'),[]);
});

test('1926 requires dated construction and a qualifying source',()=>{
 for(const date of [null,1925,1927]){
  const input=structuredClone(curated);
  input.models[0].construction.year=date;
  assert.throws(()=>integrate1926(before,input,batch),/Construction datée/);
 }
 const input=structuredClone(curated);
 input.sources.r42.type='patent';
 assert.throws(()=>integrate1926(before,input,batch),/Preuve de construction/);
});

test('les continuités et les nouveaux modèles restent distincts',()=>{
 assert.equal(periodStats(actual,1926,1926).continued,3);
 assert.equal(periodStats(actual,1926,1926).motorcycles,7);
 assert.equal(periodStats(actual,1926,1926).tricycles,0);
 assert.equal(filterHistoricalVehicles(actual,{year:1926,country:'Allemagne'}).length,4);
 assert.equal(vehicle('1926-bmw-r42').media.photo.match,'exact');
 assert.equal(vehicle('1926-bmw-r42').dates.production_start_year.year,1926);
 assert.equal(batch.references.find(r=>r.name.startsWith('BMW R47')).vehicle_id,null);
 assert.equal(vehicle('1926-monet-goyon-mc').mechanical_details.engine_manufacturer,'Motosacoche (MAG)');
});
test('les exports conservent les attestations annuelles',()=>{
 assert.deepEqual(parseInventoryJSON(exportJSON(actual)),actual);
 assert.deepEqual(parseInventoryCSV(exportCSV(actual)),actual);
});

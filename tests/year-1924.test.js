import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {integrate1924} from '../scripts/add-1924.mjs';
import {validateInventory} from '../src/history/domain.js';
import {filterHistoricalVehicles,periodStats} from '../src/history/period.js';
import {exportJSON,parseInventoryJSON,exportCSV,parseInventoryCSV} from '../src/history/serialization.js';
const read=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
const [before,actual,curated,batch]=await Promise.all([
 '../data/migrations/catalogue-106-before-1924.json','../data/migrations/catalogue-110-before-1925.json','../data/verified-1924.json','../data/research-1924.json'
].map(read));
const vehicle=id=>actual.vehicles.find(v=>v.id===id);

test('1924 preserves older records and is idempotent',()=>{
 for(const table of ['vehicles','manufacturers','brands'])assert.deepEqual(actual[table].slice(0,before[table].length),before[table]);
 assert.deepEqual(integrate1924(actual,curated,batch).inventory,actual);
 assert.deepEqual(validateInventory(actual).filter(i=>i.severity==='error'),[]);
});

test('1924 requires dated construction and a qualifying source',()=>{
 for(const date of [null,1923,1925]){
  const input=structuredClone(curated);
  input.models[0].construction.year=date;
  assert.throws(()=>integrate1924(before,input,batch),/Construction datée/);
 }
 const input=structuredClone(curated);
 input.sources.bmw.type='patent';
 assert.throws(()=>integrate1924(before,input,batch),/Preuve de construction/);
});

test('prototype, production et continuité de famille restent distincts',()=>{
 const r37=vehicle('1924-bmw-r37-prototype');
 assert.equal(r37.dates.prototype_year.year,1924);
 assert.equal(r37.dates.production_start_year.year,null);
 assert.equal(r37.historical_status,'prototype');
 assert.equal(vehicle('1923-bmw-r32').dates.production_start_year.year,1923);
 const stats=periodStats(actual,1924,1924);
 assert.equal(stats.continued,1);
 assert.equal(stats.variants,1);
 assert.equal(stats.prototypes,1);
 assert.equal(stats.tricycles,0);
 assert.equal(filterHistoricalVehicles(actual,{year:1924,country:'Allemagne',use:'competition'}).length,1);
 assert.equal(batch.references.find(r=>r.name.includes('MB1')).vehicle_id,null);
 assert.equal(r37.media.photo.match,'approximate');
});
test('exports JSON et CSV préservent les données du lot',()=>{
 assert.deepEqual(parseInventoryJSON(exportJSON(actual)),actual);
 assert.deepEqual(parseInventoryCSV(exportCSV(actual)),actual);
});

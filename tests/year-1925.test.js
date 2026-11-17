import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {integrate1925} from '../scripts/add-1925.mjs';
import {validateInventory} from '../src/history/domain.js';
import {filterHistoricalVehicles,periodStats} from '../src/history/period.js';
import {exportJSON,parseInventoryJSON,exportCSV,parseInventoryCSV} from '../src/history/serialization.js';
const read=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
const [before,actual,curated,batch]=await Promise.all([
 '../data/migrations/catalogue-110-before-1925.json','../public/inventory.json','../data/verified-1925.json','../data/research-1925.json'
].map(read));
const vehicle=id=>actual.vehicles.find(v=>v.id===id);

test('1925 preserves older records and is idempotent',()=>{
 for(const table of ['vehicles','manufacturers','brands'])assert.deepEqual(actual[table].slice(0,before[table].length),before[table]);
 assert.deepEqual(integrate1925(actual,curated,batch).inventory,actual);
 assert.deepEqual(validateInventory(actual).filter(i=>i.severity==='error'),[]);
});

test('1925 requires dated construction and a qualifying source',()=>{
 for(const date of [null,1924,1926]){
  const input=structuredClone(curated);
  input.models[0].construction.year=date;
  assert.throws(()=>integrate1925(before,input,batch),/Construction datée/);
 }
 const input=structuredClone(curated);
 input.sources.r37.type='patent';
 assert.throws(()=>integrate1925(before,input,batch),/Preuve de construction/);
});

test('la R 37 de série, le prototype et la continuité R 32 sont distincts',()=>{
 const series=vehicle('1925-bmw-r37-serie');
 assert.equal(series.dates.production_start_year.year,1925);
 assert.equal(series.relationships[0].target_id,'1924-bmw-r37-prototype');
 assert.equal(vehicle('1924-bmw-r37-prototype').dates.prototype_year.year,1924);
 assert.equal(periodStats(actual,1925,1925).continued,1);
 assert.equal(periodStats(actual,1925,1925).variants,1);
 assert.equal(filterHistoricalVehicles(actual,{year:1925,country:'Allemagne'}).length,3);
 assert.equal(periodStats(actual,1925,1925).tricycles,0);
 assert.equal(vehicle('1925-bmw-r39').media.photo.match,'approximate');
 assert.ok(batch.references.some(r=>r.name.includes('Cyclecarette')&&r.group==='related'&&r.vehicle_id===null));
});
test('les exports conservent les sources et les liens',()=>{
 assert.deepEqual(parseInventoryJSON(exportJSON(actual)),actual);
 assert.deepEqual(parseInventoryCSV(exportCSV(actual)),actual);
});

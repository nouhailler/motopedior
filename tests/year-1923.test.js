import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {integrate1923} from '../scripts/add-1923.mjs';
import {validateInventory} from '../src/history/domain.js';
import {filterHistoricalVehicles,periodStats} from '../src/history/period.js';
import {exportJSON,parseInventoryJSON,exportCSV,parseInventoryCSV} from '../src/history/serialization.js';
const read=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
const [before,actual,curated,batch]=await Promise.all([
 '../data/migrations/catalogue-101-before-1923.json','../data/migrations/catalogue-106-before-1924.json','../data/verified-1923.json','../data/research-1923.json'
].map(read));
const vehicle=id=>actual.vehicles.find(v=>v.id===id);

test('1923 preserves older records and is idempotent',()=>{
 for(const table of ['vehicles','manufacturers','brands'])assert.deepEqual(actual[table].slice(0,before[table].length),before[table]);
 assert.deepEqual(integrate1923(actual,curated,batch).inventory,actual);
 assert.deepEqual(validateInventory(actual).filter(i=>i.severity==='error'),[]);
});

test('1923 requires dated construction and a qualifying source',()=>{
 for(const date of [null,1922,1924]){
  const input=structuredClone(curated);
  input.models[0].construction.year=date;
  assert.throws(()=>integrate1923(before,input,batch),/Construction datée/);
 }
 const input=structuredClone(curated);
 input.sources.bmw.type='patent';
 assert.throws(()=>integrate1923(before,input,batch),/Preuve de construction/);
});

test('production, presentation and annual continuities stay distinct',()=>{
 const r32=vehicle('1923-bmw-r32');
 assert.equal(r32.presentation_date.year,1923);
 assert.equal(r32.dates.production_start_year.year,1923);
 assert.equal(r32.dates.production_end_year.year,1926);
 assert.equal(r32.dates.commercialization_year.year,null);
 assert.equal(r32.manufacturer_id,before.manufacturers.find(m=>m.name==='BMW').id);
 assert.equal(vehicle('1921-guzzi-normale').documented_construction.year,1921);
 assert.equal(periodStats(actual,1923,1923).continued,1);
});

test('filters include the competition sidecar without counting a tricycle',()=>{
 assert.equal(filterHistoricalVehicles(actual,{year:1923,country:'Royaume-Uni',use:'competition'}).length,1);
 assert.equal(periodStats(actual,1923,1923).tricycles,0);
 assert.equal(periodStats(actual,1923,1923).motorcycles,6);
 assert.equal(batch.references.find(r=>r.name.includes('XP-4')).vehicle_id,null);
});

test('historical exports round trip the 1923 inventory',()=>{
 assert.deepEqual(parseInventoryJSON(exportJSON(actual)),actual);
 assert.deepEqual(parseInventoryCSV(exportCSV(actual)),actual);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {integrate1928} from '../scripts/add-1928.mjs';
import {validateInventory} from '../src/history/domain.js';
import {filterHistoricalVehicles,periodStats} from '../src/history/period.js';
import {exportJSON,parseInventoryJSON,exportCSV,parseInventoryCSV} from '../src/history/serialization.js';
const read=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
const [before,actual,curated,batch]=await Promise.all([
 '../data/migrations/catalogue-118-before-1928.json','../data/migrations/catalogue-125-before-1929.json','../data/verified-1928.json','../data/research-1928.json'
].map(read));
const vehicle=id=>actual.vehicles.find(v=>v.id===id);

test('1928 preserves older records and is idempotent',()=>{
 for(const table of ['vehicles','manufacturers','brands'])assert.deepEqual(actual[table].slice(0,before[table].length),before[table]);
 assert.deepEqual(integrate1928(actual,curated,batch).inventory,actual);
 assert.deepEqual(validateInventory(actual).filter(i=>i.severity==='error'),[]);
});

test('1928 requires dated construction and a qualifying source',()=>{
 for(const date of [null,1927,1929]){
  const input=structuredClone(curated);
  input.models[0].construction.year=date;
  assert.throws(()=>integrate1928(before,input,batch),/Construction datée/);
 }
 const input=structuredClone(curated);
 input.sources.r47.type='patent';
 assert.throws(()=>integrate1928(before,input,batch),/Preuve de construction/);
});

test('la R 42 conserve sa fiche et la R 47 garde son début de série en 1927',()=>{
 assert.equal(vehicle('1928-bmw-r47').dates.production_start_year.year,1927);
 assert.equal(vehicle('1926-bmw-r42').dates.production_start_year.year,1926);
 assert.equal(periodStats(actual,1928,1928).continued,1);
 assert.equal(periodStats(actual,1928,1928).tricycles,0);
 assert.equal(filterHistoricalVehicles(actual,{year:1928,country:'Allemagne'}).length,6);
 assert.equal(vehicle('1928-indian-101-scout').relationships[0].target_id,'1922-indian-scout');
 assert.equal(vehicle('1928-bmw-r52').media.photo.license.status,'allowed');
});
test('les exports conservent les attestations et les fiches',()=>{
 assert.deepEqual(parseInventoryJSON(exportJSON(actual)),actual);
 assert.deepEqual(parseInventoryCSV(exportCSV(actual)),actual);
});

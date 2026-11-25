import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {integrate1930} from '../scripts/add-1930.mjs';
import {validateInventory} from '../src/history/domain.js';
import {filterHistoricalVehicles,periodStats} from '../src/history/period.js';
import {attestedVehicle} from '../src/history/attestations.js';
import {appendSeedAdditions} from '../src/history/seed-update.js';
import {exportJSON,parseInventoryJSON,exportCSV,parseInventoryCSV} from '../src/history/serialization.js';
const read=async p=>JSON.parse(await readFile(new URL(p,import.meta.url),'utf8'));
const [before,actual,curated,batch]=await Promise.all(['../data/migrations/catalogue-125-before-1930.json','../public/inventory.json','../data/verified-1930.json','../data/research-1930.json'].map(read));
const vehicle=id=>actual.vehicles.find(v=>v.id===id);
test('1930 preserves prior records and a second import changes nothing',()=>{
 for(const table of ['vehicles','manufacturers','brands'])assert.deepEqual(actual[table].slice(0,before[table].length),before[table]);
 assert.equal(actual.vehicles.length,145);
 assert.deepEqual(validateInventory(actual).filter(i=>i.severity==='error'),[]);
 assert.deepEqual(integrate1930(actual,curated,batch).inventory,actual);
});
test('1930 excludes undated projects, patents and machines from adjacent years',()=>{
 for(const year of [null,1929,1931]){const input=structuredClone(curated);input.models[0].construction.year=year;assert.throws(()=>integrate1930(before,input,batch),/Construction datée/)}
 for(const type of ['patent','iconographic']){const input=structuredClone(curated);input.sources.r11.type=type;assert.throws(()=>integrate1930(before,input,batch),/Preuve de construction/)}
 const input=structuredClone(curated);input.attestations[0].year=1931;assert.throws(()=>integrate1930(before,input,batch),/Attestation annuelle/);
 for(const name of ['BMW WR 750','Indian 402','Nimbus','Laurin & Klement'])assert.equal(batch.references.find(r=>r.name===name).vehicle_id,null);
});
test('model families, commercial variants and competition are counted separately',()=>{
 const s=periodStats(actual,1930,1930);assert.equal(s.documented,23);assert.equal(s.continued,4);assert.equal(s.variants,1);assert.equal(s.competition,1);assert.equal(s.tricycles,0);
 assert.equal(vehicle('1930-harley-vl').relationships[0].target_id,'1930-harley-v');
 assert.equal(vehicle('1930-velocette-ktt').specializations[0],'competition');
 assert.equal(s.pendingCandidates,120);
 assert.equal(filterHistoricalVehicles(actual,{year:1930,country:'France'}).length,5);
 assert.equal(filterHistoricalVehicles(actual,{year:1930,country:'Allemagne'}).length,6);
});
test('construction of an exemplar never becomes an invented first construction',()=>{
 for(const m of curated.models)assert.equal(vehicle(m.id).dates.prototype_year.year,null);
 assert.equal(vehicle('1930-bmw-r11').dates.production_start_year.year,1929);
 assert.equal(vehicle('1930-henderson-kj').dates.production_end_year.year,1931);
 assert.equal(vehicle('1930-nsu-501ts').technical.displacement_cc,497);
 assert.equal(vehicle('1930-bmw-r16').technical.displacement_cc,736);
 assert.equal(vehicle('1930-harley-b').documented_construction.precision,'approximate');
 const scoped=attestedVehicle(actual,vehicle('1925-scott-flying-squirrel'),1930,1930);assert.equal(scoped.technical.displacement_cc,null);
});
test('editorial upgrade preserves local edits, collections and existing identifiers',()=>{
 const local=structuredClone(before);local.vehicles[0].description='Description locale à conserver';local.collections=[{id:'personal',vehicle_ids:[local.vehicles[0].id]}];
 const result=appendSeedAdditions(local,actual);assert.equal(result.added.length,20);assert.equal(result.skipped.length,0);
 assert.deepEqual(result.inventory.vehicles[0],local.vehicles[0]);assert.deepEqual(result.inventory.collections,local.collections);
 assert.equal(result.inventory.construction_attestations.length,actual.construction_attestations.length);
 assert.equal(appendSeedAdditions(result.inventory,actual).changed,false);
});
test('JSON and CSV preserve the new records and annual evidence',()=>{
 assert.deepEqual(parseInventoryJSON(exportJSON(actual)),actual);
 assert.deepEqual(parseInventoryCSV(exportCSV(actual)),actual);
});

test('validated photographs retain licensing, sources and offline assets',async()=>{
 const catalog=await read('../public/motos.json');
 const rows=curated.models.map(m=>catalog.find(p=>p.id===m.id));
 assert.equal(rows.filter(m=>m.photo).length,16);
 for(const m of rows){
  if(!m.photo){assert.equal(m.photoStatus,'none');assert.equal(m.image,'/image-unavailable.svg');continue;}
  assert.equal(m.photo.license.status,'allowed');assert.ok(m.photo.author);assert.ok(m.photo.license.url);assert.ok(m.photo.sourcePage.startsWith('https://commons.wikimedia.org/'));
  assert.equal(m.photoStatus,'approximate');assert.ok(m.photo.reviewNote);
  for(const width of [480,800,1600])assert.ok((await readFile(new URL('../public'+m.photo.local[width],import.meta.url))).length>0);
  assert.deepEqual(vehicle(m.id).media.photo,m.photo);
 }
});

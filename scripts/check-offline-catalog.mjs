import {readFile,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
const read=async p=>JSON.parse(await readFile(p,'utf8'));
assert.deepEqual(await read('dist/inventory.json'),await read('public/inventory.json'),'Le build doit conserver tous les faits documentaires');
const sw=await readFile('dist/sw.js','utf8');
for(const file of ['inventory.json','motos.json']){
 assert.ok(sw.includes(`"${file}"`),`${file} doit être précaché pour démarrer hors ligne`);
}
const bytes=(await stat('dist/inventory.json')).size;assert.ok(bytes<=4*1024*1024,'Le catalogue doit rester sous la limite Workbox ; envisager des lots si elle est dépassée');
console.log('Catalogue hors ligne vérifié : '+bytes+' octets, contenu intégral et précache présent.');

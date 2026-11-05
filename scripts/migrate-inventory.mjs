import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {migrateLegacy} from '../src/history/migrate.js';
import {validateInventory} from '../src/history/domain.js';
await mkdir('data/migrations',{recursive:true});
const records=JSON.parse(await readFile('public/motos.json','utf8'));
const archive='data/migrations/catalogue-v1.json';
try{await readFile(archive)}catch{await writeFile(archive,JSON.stringify(records,null,2)+'\n')}
const inventory=migrateLegacy(records);
const errors=validateInventory(inventory).filter(i=>i.severity==='error');
if(errors.length){process.stderr.write(JSON.stringify(errors,null,2));process.exit(1)}
await writeFile('public/inventory.json',JSON.stringify(inventory,null,2)+'\n');
process.stdout.write(`Migration v2 : ${inventory.vehicles.length} véhicules, ${inventory.manufacturers.length} constructeurs, ${inventory.sources.length} sources. Anciennes données archivées.\n`);

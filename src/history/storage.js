import {openDB} from 'idb';
import {clone,validateInventory,now} from './domain.js';
import {remapCollections} from './operations.js';
import {appendSeedAdditions} from './seed-update.js';
export const DATABASE_VERSION=2;
let connection;
export function openInventoryDatabase(name='motopedia'){
 return openDB(name,DATABASE_VERSION,{upgrade(db,oldVersion,newVersion,tx){if(oldVersion<1&&!db.objectStoreNames.contains('state'))db.createObjectStore('state');if(!db.objectStoreNames.contains('historical_inventory'))db.createObjectStore('historical_inventory');if(!db.objectStoreNames.contains('historical_backups'))db.createObjectStore('historical_backups',{autoIncrement:true});tx.objectStore('state').put({from:oldVersion,to:newVersion,at:now()},'historicalSchemaMigration')},blocked(){if(typeof window!=='undefined')window.dispatchEvent(new CustomEvent('motopedia-storage-warning',{detail:'Fermez les anciens onglets MotoPedia puis rechargez pour terminer la migration locale.'}))},blocking(){connection?.close()}}).then(db=>{connection=db;return db});
}
export const dbPromise=typeof indexedDB!=='undefined'?openInventoryDatabase():null;
export async function loadHistoricalInventory(db,seed){const tx=db.transaction(['historical_inventory','historical_backups'],'readwrite');let data=await tx.objectStore('historical_inventory').get('main');if(!data){data=clone(seed);await tx.objectStore('historical_backups').add({at:now(),action:'initial_seed',inventory:clone(seed)});await tx.objectStore('historical_inventory').put(data,'main')}else if(seed?.vehicles){const update=appendSeedAdditions(data,seed);if(update.added.length){await tx.objectStore('historical_backups').add({at:now(),action:'before_editorial_additions',inventory:clone(data)});data={...update.inventory,revision:data.revision+1};await tx.objectStore('historical_inventory').put(data,'main')}}await tx.done;return data}
export async function commitHistoricalInventory(db,next,{expectedRevision}={}){
 const issues=validateInventory(next).filter(i=>i.severity==='error');if(issues.length)throw Error(issues.slice(0,10).map(i=>i.message).join('\n'));
 const tx=db.transaction(['historical_inventory','historical_backups','state'],'readwrite');const store=tx.objectStore('historical_inventory');const current=await store.get('main');if(current&&expectedRevision!==undefined&&current.revision!==expectedRevision){tx.abort();await tx.done.catch(()=>{});throw Error('Le catalogue a changé dans un autre onglet. Rechargez avant d’enregistrer.')}
 const updated={...clone(next),revision:(current?.revision??0)+1};if(current)await tx.objectStore('historical_backups').add({at:now(),action:'before_commit',inventory:current});
 const state=tx.objectStore('state'),mapped=remapCollections({collections:await state.get('collections'),recent:await state.get('recent')},updated.redirects||{});
 await state.put(mapped.collections,'collections');await state.put(mapped.recent,'recent');await store.put(updated,'main');await tx.done;return updated;
}

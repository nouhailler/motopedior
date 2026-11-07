import {clone} from './domain.js';
// Append research references and provenance notes; never replace local editorial decisions.
export function appendResearchReferences(local,incoming){
 let changed=false;
 for(const reference of incoming.references){
  const existing=local.references.find(r=>r.reference===reference.reference);
  if(!existing){local.references.push(clone(reference));changed=true;continue}
  for(const note of reference.list_annotations||[]){
   if(existing.list_annotations?.some(n=>n.id===note.id))continue;
   existing.list_annotations??=[];existing.list_annotations.push(clone(note));changed=true;
  }
 }
 return changed;
}

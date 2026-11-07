#!/usr/bin/env python3
"""Publish only this batch in isolation, then append; never prune older media.
The Commons module refreshes imageinfo/extmetadata and applies the normal rights gate.
"""
import json,shutil,tempfile
from pathlib import Path
import commons_sync as commons
ROOT=Path(__file__).resolve().parents[1]
def read(p):return json.loads(p.read_text())
def write(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
models=read(ROOT/'data/models.json');ids={m['id'] for m in read(ROOT/'data/verified-1911-1920.json')['models']};models=[m for m in models if m['id'] in ids]
reviews=read(ROOT/'data/photo-reviews.json');selected={k:v for k,v in reviews.items() if k in ids}
with tempfile.TemporaryDirectory(prefix='motopedia-1911-media-') as directory:
 stage=Path(directory);write(stage/'data/photo-reviews.json',selected);(stage/'public').mkdir();commons.ROOT=stage;commons.publish(models)
 for photo in (stage/'public/images').glob('*.webp') if (stage/'public/images').exists() else []:shutil.copy2(photo,ROOT/'public/images'/photo.name)
 for path,key in [('public/motos.json',None),('public/photo-credits.json',None),('public/photo-inventory.json','models')]:
  new=read(stage/path);old=read(ROOT/path)
  rows=new[key] if key else new;oldrows=old[key] if key else old
  idkey='id' if path.endswith('motos.json') else 'modelId'
  merged=[r for r in oldrows if r[idkey] not in ids]+rows
  write(ROOT/path,{**old,'generatedAt':new['generatedAt'],key:merged} if key else merged)

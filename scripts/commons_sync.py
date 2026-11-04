#!/usr/bin/env python3
"""Discover Commons photos, then publish only individually reviewed, licensed files.
Usage: python3 scripts/commons_sync.py [--search] [--publish]
Network access is an editorial task; the PWA only reads the generated local catalogue.
"""
import argparse, datetime, hashlib, html, io, json, re, subprocess, time, unicodedata
from pathlib import Path
from urllib.parse import urlencode, unquote, urlsplit
from PIL import Image, ImageOps
ROOT=Path(__file__).resolve().parents[1]
API='https://commons.wikimedia.org/w/api.php'
NOW=datetime.datetime.now(datetime.timezone.utc).isoformat()
class TextOnly(__import__('html.parser',fromlist=['HTMLParser']).HTMLParser):
 def __init__(self): super().__init__();self.parts=[]
 def handle_data(self,value):self.parts.append(value)
def plain(value):
 p=TextOnly();p.feed(value or '');return ' '.join(html.unescape(' '.join(p.parts)).split())
def key(title):return unquote(title).replace('_',' ').casefold()
def request(params,endpoint=API):
 url=endpoint+'?'+urlencode({'action':'query','format':'json','formatversion':2,**params})
 for attempt in range(4):
  time.sleep(1)
  raw=subprocess.check_output(['curl','--retry','1','--retry-max-time','20','--retry-delay','2','--fail','--silent','--show-error','--location','--max-time','40','--user-agent','MotoPedia/1.0 (visual motorcycle encyclopedia; editorial metadata importer)',url])
  result=json.loads(raw)
  if 'error' not in result:return result
  if result['error'].get('code') not in ('maxlag','ratelimited'):raise RuntimeError(result['error'])
  time.sleep(2**attempt)
 raise RuntimeError('Wikimedia temporarily unavailable')
def license_policy(meta):
 name=plain(meta.get('LicenseShortName',{}).get('value',''))
 url=meta.get('LicenseUrl',{}).get('value','').strip()
 if url.startswith('//'):url='https:'+url
 restrictions=plain(meta.get('Restrictions',{}).get('value',''))
 if restrictions:return dict(status='excluded',reason='Restrictions supplémentaires à clarifier : '+restrictions)
 if re.search(r'\bNC\b|\bND\b|non.?commercial|no.?deriv',name,re.I):return dict(status='excluded',reason='Licence restrictive')
 cc=re.fullmatch(r'https?://creativecommons\.org/licenses/(by|by-sa)/(1\.0|2\.0|2\.5|3\.0|4\.0)/?(?:deed\.[a-z-]+)?',url)
 if cc:
  author=plain(meta.get('Artist',{}).get('value',''))
  if not author or author.casefold() in ('unknown','unknown author','auteur inconnu'):return dict(status='excluded',reason='Attribution manquante ou incertaine')
  return dict(status='allowed',name='CC '+cc[1].upper()+' '+cc[2],url='https://creativecommons.org/licenses/'+cc[1]+'/'+cc[2]+'/',shareAlike=cc[1]=='by-sa',attributionRequired=True,reason='Licence et auteur identifiés dans extmetadata')
 if re.search(r'^(Public domain|CC0|PD\b)',name,re.I) and ('publicdomain' in url or plain(meta.get('Copyrighted',{}).get('value','')).casefold()=='false'):
  return dict(status='allowed',name=name,url=url or 'https://commons.wikimedia.org/wiki/Commons:Public_domain',shareAlike=False,attributionRequired=False,reason='Domaine public ou CC0 identifié dans extmetadata')
 return dict(status='excluded',reason='Licence absente ou non prise en charge : '+(name or 'inconnue'))
def normalize(page,query=None):
 info=page.get('imageinfo',[{}])[0];meta=info.get('extmetadata',{});policy=license_policy(meta)
 return dict(fileTitle=page['title'],pageId=page.get('pageid'),query=query,sourceSha1=info.get('sha1'),thumbnailUrl=info.get('thumburl'),originalUrl=info.get('url'),sourcePage=info.get('descriptionurl'),author=plain(meta.get('Artist',{}).get('value','')),attribution=plain(meta.get('Attribution',{}).get('value','')),creditLine=plain(meta.get('Credit',{}).get('value','')),description=plain(meta.get('ImageDescription',{}).get('value','')),width=info.get('width'),height=info.get('height'),mime=info.get('mime'),license=policy,metadata=meta,checkedAt=NOW)
def info(titles):
 photos=[]
 for offset in range(0,len(titles),20):
  result=request(dict(titles='|'.join(titles[offset:offset+20]),prop='imageinfo',iiprop='url|size|mime|sha1|extmetadata',iiurlwidth=800,redirects=1))
  photos.extend(normalize(p) for p in result.get('query',{}).get('pages',[]) if p.get('imageinfo'))
 return photos
def score(photo,model):
 text=key(photo['fileTitle']+' '+photo.get('description',''))
 terms=re.findall(r'[a-z0-9]+',key(model['brand']+' '+model['model']))
 return round(sum(t in text for t in terms)/max(1,len(terms))*60+min(photo.get('width') or 0,2000)/100+ (20 if photo['license']['status']=='allowed' else 0),1)
def discover(models):
 inventory=[]
 existing=ROOT/'data/commons-inventory.json'
 if existing.exists():inventory=json.loads(existing.read_text()).get('models',[])
 for model in models:
  if any(i['modelId']==model['id'] for i in inventory):continue
  candidates={}
  for query in model['imageQueries']:
   result=request(dict(generator='search',gsrsearch=query+' filetype:bitmap',gsrnamespace=6,gsrlimit=8,prop='imageinfo',iiprop='url|size|mime|sha1|extmetadata',iiurlwidth=800))
   for page in result.get('query',{}).get('pages',[]):
    if not page.get('imageinfo'):continue
    p=normalize(page,query);p['score']=score(p,model);p['match']='unreviewed';candidates[key(p['fileTitle'])]=p
  inventory.append(dict(modelId=model['id'],queries=model['imageQueries'],candidates=sorted(candidates.values(),key=lambda p:-p['score'])))
  write(ROOT/'data/commons-inventory.json',dict(provider='Wikimedia Commons',generatedAt=NOW,models=inventory))
  print(model['id'],model['brand'],model['model'],len(candidates),'candidates',flush=True)
 write(ROOT/'data/commons-inventory.json',dict(provider='Wikimedia Commons',generatedAt=NOW,models=inventory))
def write(path,data):path.parent.mkdir(parents=True,exist_ok=True);path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
def publish(models):
 reviews=json.loads((ROOT/'data/photo-reviews.json').read_text());titles=[]
 for review in reviews.values():
  for p in review.get('photos',[]):titles.append(p['fileTitle'])
 files={key(p['fileTitle']):p for p in info(list(dict.fromkeys(titles)))} if titles else {}
 catalog=[];audit=[];credits=[];used=set()
 existing=json.loads((ROOT/'public/motos.json').read_text()) if (ROOT/'public/motos.json').exists() else []
 snapshots={key(p['fileTitle']):p for m in existing for p in [m.get('photo'),*m.get('gallery',[])] if p}
 for model in models:
  review=reviews.get(model['id'],{});approved=[];report=[]
  for choice in review.get('photos',[]):
   photo=files.get(key(choice['fileTitle']))
   reason='Métadonnées introuvables';allowed=False
   if photo:
    reason=photo['license']['reason'];allowed=photo['license']['status']=='allowed' and choice.get('match') in ('exact','approximate') and choice.get('approved') is True
    if not choice.get('approved'):reason='Correspondance non validée'
    if urlsplit(photo.get('originalUrl') or '').hostname!='upload.wikimedia.org' or photo.get('mime') not in ('image/jpeg','image/png','image/webp'):
     allowed=False;reason='Source ou format non autorisé'
   item=dict(fileTitle=choice['fileTitle'],match=choice.get('match','none'),approved=allowed,reviewNote=choice.get('note',''),reason=reason,photo=photo)
   if allowed:
    try:
     snapshot=snapshots.get(key(photo['fileTitle']))
     reusable=snapshot and snapshot.get('originalUrl')==photo['originalUrl'] and all((ROOT/'public'/p.lstrip('/')).exists() for p in snapshot.get('local',{}).values()) and bool(snapshot.get('local')) and (not snapshot.get('sourceSha1') or snapshot['sourceSha1']==photo.get('sourceSha1'))
     if reusable:
      local=snapshot['local'];used.update(Path(p).name for p in local.values())
     else:
      # Always download the API original; optimised files retain their original license.
      cachePath=ROOT/'data/.downloads'/hashlib.sha256((photo['originalUrl']+str(photo.get('sourceSha1',''))).encode()).hexdigest();cachePath.parent.mkdir(exist_ok=True)
      if cachePath.exists():raw=cachePath.read_bytes()
      else:
       time.sleep(1)
       raw=subprocess.check_output(['curl','--fail','--silent','--show-error','--location','--max-time','20','--max-filesize','25000000',urlsplit(photo['originalUrl'])._replace(query='').geturl()])
       cachePath.write_bytes(raw)
      image=ImageOps.exif_transpose(Image.open(io.BytesIO(raw))).convert('RGB');digest=hashlib.sha256(raw).hexdigest()[:12];stem=f'{model["id"]}-{digest}'
      local={}
      for width in (480,800,1600):
       filename=f'{stem}-{width}.webp';target=ROOT/'public/images'/filename;target.parent.mkdir(exist_ok=True);copy=image.copy();copy.thumbnail((width,width));copy.save(target,'WEBP',quality=86);used.add(filename);local[str(width)]='/images/'+filename
     asset={k:v for k,v in photo.items() if k not in ('metadata','query','description')}
     asset['sourceSha1']=snapshot.get('sourceSha1') if reusable else photo.get('sourceSha1')
     asset['originalImportedAt']=snapshot.get('originalImportedAt',snapshot.get('checkedAt')) if reusable else NOW
     asset.update(local=local,image=local['1600'],match=choice['match'],reviewNote=choice.get('note',''),changes='Conversion WebP et redimensionnement ; affichage recadré selon la vue.',reviewedAt=review.get('reviewedAt',NOW))
     approved.append(asset);credits.append(dict(modelId=model['id'],**asset))
    except Exception as error:item['approved']=False;item['reason']='Téléchargement impossible : '+str(error)
   report.append(item)
  m={**model};m.pop('imageQueries',None);m['photo']=approved[0] if approved else None;m['image']=approved[0]['image'] if approved else '/image-unavailable.svg';m['gallery']=approved[1:];m['photoStatus']=approved[0]['match'] if approved else 'none';m['photoStatusNote']=review.get('note','Aucune photo validée pour ce modèle.');catalog.append(m)
  audit.append(dict(modelId=m['id'],brand=m['brand'],model=m['model'],status=m['photoStatus'],note=m['photoStatusNote'],reviewedAt=review.get('reviewedAt'),files=report))
  print(m['id'],m['photoStatus'],len(approved),'approved photo(s)',flush=True)
 write(ROOT/'public/motos.json',catalog);write(ROOT/'public/photo-inventory.json',dict(generatedAt=NOW,models=audit));write(ROOT/'public/photo-credits.json',credits)
 # Stale or unapproved assets must not be shipped or precached.
 for path in (ROOT/'public/images').glob('*.webp'):
  if path.name not in used:path.unlink()
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--search',action='store_true');parser.add_argument('--publish',action='store_true');args=parser.parse_args();models=json.loads((ROOT/'data/models.json').read_text())
 if args.search:discover(models)
 if args.publish:publish(models)
 if not args.search and not args.publish:parser.print_help()

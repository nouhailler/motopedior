#!/usr/bin/env python3
"""Resolve documentary references; Wikipedia never selects the primary photograph."""
import json
from urllib.parse import unquote,urlsplit
from commons_sync import ROOT,request,write,NOW,key
models=json.loads((ROOT/'data/models.json').read_text())
titles=[unquote(urlsplit(m['sourcePage']).path.split('/wiki/')[-1]).replace('_',' ') for m in models]
r=request(dict(titles='|'.join(titles),redirects=1,prop='info',inprop='url'),'https://en.wikipedia.org/w/api.php')
redirects={key(p['from']):p['to'] for p in r.get('query',{}).get('redirects',[])}
pages={key(p['title']):p for p in r.get('query',{}).get('pages',[])}
for m,title in zip(models,titles):
 title=redirects.get(key(title),title);p=pages.get(key(title),{})
 if not p or p.get('missing'):continue
 m['documentation']=[source for source in m.get('documentation',[]) if not (source.get('provider')=='Wikipedia' and source.get('role')=='complementary')]+[dict(provider='Wikipedia',role='complementary',url=p['fullurl'],title=p['title'],pageId=p['pageid'],revisionId=p.get('lastrevid'),checkedAt=NOW,note='Référence documentaire complémentaire ; spécifications selon millésime et version, non certifiées par la seule présence du lien.')]
write(ROOT/'data/models.json',models)
print('Références Wikipédia résolues',sum(any(s.get('provider')=='Wikipedia' and s.get('pageId') for s in m.get('documentation',[])) for m in models))

import unittest,json,tempfile
from unittest.mock import patch
import commons_sync
from pathlib import Path
from commons_sync import license_policy,normalize,ROOT

def meta(name,url,author='Photographe',restrictions=''):
 return {k:{'value':v} for k,v in dict(LicenseShortName=name,LicenseUrl=url,Artist=author,Restrictions=restrictions).items()}
class RightsPolicyTests(unittest.TestCase):
 def test_uncertain_or_restrictive_files_are_excluded(self):
  for data in ({},meta('CC BY-NC 4.0','https://creativecommons.org/licenses/by-nc/4.0/'),meta('CC BY-ND 4.0','https://creativecommons.org/licenses/by-nd/4.0/'),meta('GFDL','https://www.gnu.org/licenses/fdl-1.3.html'),meta('CC BY 4.0','https://creativecommons.org/licenses/by/4.0/',''),meta('CC BY 4.0','https://creativecommons.org/licenses/by/4.0/',restrictions='personality')):
   with self.subTest(metadata=data):self.assertEqual(license_policy(data)['status'],'excluded')
 def test_share_alike_and_attribution_are_preserved(self):
  policy=license_policy(meta('CC BY-SA 3.0','https://creativecommons.org/licenses/by-sa/3.0/'))
  self.assertEqual(policy['status'],'allowed');self.assertTrue(policy['shareAlike']);self.assertTrue(policy['attributionRequired'])
 def test_metadata_html_is_plain_text(self):
  data=meta('CC BY 4.0','https://creativecommons.org/licenses/by/4.0/','<a href="https://example.org">Alice &amp; Bob</a>')
  result=normalize({'title':'File:Motorcycle.jpg','imageinfo':[{'extmetadata':data}]})
  self.assertEqual(result['author'],'Alice & Bob')
 def test_every_shipped_asset_has_validated_rights(self):
  models=json.loads((ROOT/'public/motos.json').read_text());shipped=set()
  for model in models:
   for photo in [model['photo'],*model['gallery']]:
    if photo is None:continue
    self.assertEqual(photo['license']['status'],'allowed');self.assertIn(photo['match'],['exact','approximate']);self.assertTrue(photo['thumbnailUrl']);self.assertTrue(photo['originalUrl']);self.assertTrue(photo['sourcePage'].startswith('https://commons.wikimedia.org/'))
    for local in photo['local'].values():self.assertTrue((ROOT/'public'/local.lstrip('/')).exists());shipped.add(Path(local).name)
  self.assertEqual(shipped,{p.name for p in (ROOT/'public/images').glob('*.webp')})
class DiscoveryTests(unittest.TestCase):
 def test_query_refinement_keeps_old_candidates_and_only_requests_new_queries(self):
  with tempfile.TemporaryDirectory() as root:
   folder=Path(root);(folder/'data').mkdir();old={'fileTitle':'File:Known.jpg','score':50}
   (folder/'data/commons-inventory.json').write_text(json.dumps({'models':[{'modelId':'bike','queries':['old query'],'candidates':[old]}]}))
   with patch.object(commons_sync,'ROOT',folder),patch.object(commons_sync,'request',return_value={'query':{'pages':[]}}) as request:
    model={'id':'bike','brand':'Maker','model':'Model','imageQueries':['old query','new query']}
    commons_sync.discover([model]);self.assertEqual(request.call_count,1)
    self.assertEqual(request.call_args.args[0]['gsrsearch'],'new query filetype:bitmap')
    data=json.loads((folder/'data/commons-inventory.json').read_text())['models'];self.assertEqual(len(data),1);self.assertEqual(data[0]['candidates'],[old]);self.assertEqual(data[0]['queries'],['old query','new query'])
    commons_sync.discover([model]);self.assertEqual(request.call_count,1)
if __name__=='__main__':unittest.main()

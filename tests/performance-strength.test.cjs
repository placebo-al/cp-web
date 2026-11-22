const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
test('all stages and weeks render four complete days with clean names and no empty fields',()=>{
 const html=fs.readFileSync(path.join(__dirname,'../Performance-Strength/index.html'),'utf8');
 const script=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
 const events={};
 const stage={value:'0',addEventListener:(event,fn)=>events.stage=fn};
 const week={value:'0',addEventListener:(event,fn)=>events.week=fn};
 const host={innerHTML:'',classList:{toggle(){}}};
 const title={};
 const controls={'#stage':stage,'#week':week,'#days':host,'#stage-title':title};
 const root={querySelector:selector=>controls[selector],querySelectorAll:()=>[]};
 vm.runInNewContext(script,{document:{getElementById:()=>root}});
 const expected=['Foundation','Get Stable','Get Strong','Work','Get Powerful'];
 for(let s=0;s<5;s++)for(let w=0;w<3;w++){
  stage.value=String(s);week.value=String(w);events.stage();
  assert.equal(title.textContent,expected[s]);
  assert.equal([...host.innerHTML.matchAll(/class="day"/g)].length,4);
  for(const day of ['A','B','C','D'])assert.ok(host.innerHTML.includes('POWER '+day));
  assert.doesNotMatch(host.innerHTML,/<td><\/td>|<tbody><\/tbody>|PP ·|MP ·|PL ·|First Circuit|Second Circuit|Y,T,W\.L|Pillar Bridge- Lateral :/);
  assert.match(host.innerHTML,/Pillar Prep/);assert.match(host.innerHTML,/Movement Prep/);assert.match(host.innerHTML,/Plyometrics/);
 }
});

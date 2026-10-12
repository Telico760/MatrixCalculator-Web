'use strict';
const $ = id => document.getElementById(id);
let operation = 'add';
let lastResult = null;
const exampleA = [[1,2],[3,4]], exampleB = [[5,6],[7,8]];
function options(select){for(let i=1;i<=10;i++){const o=document.createElement('option');o.value=i;o.textContent=i;select.append(o)}select.value='2'}
function dimensions(key){return [Number($(key+'Rows').value),Number($(key+'Cols').value)]}
function readGrid(key){const [r,c]=dimensions(key),inputs=[...$(key+'Grid').querySelectorAll('input')];return Array.from({length:r},(_,i)=>Array.from({length:c},(_,j)=>inputs[i*c+j].value))}
function setGrid(key,values){$(key+'Rows').value=String(values.length);$(key+'Cols').value=String(values[0].length);renderGrid(key,values)}
function renderGrid(key,values){const [rows,cols]=dimensions(key),old=values||readGrid(key);const grid=$(key+'Grid');grid.replaceChildren();grid.style.gridTemplateColumns=`repeat(${cols}, max-content)`;for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const input=document.createElement('input');input.type='number';input.step='any';input.value=old[i]?.[j]??0;input.setAttribute('aria-label',`Matrix ${key.toUpperCase()} row ${i+1}, column ${j+1}`);grid.append(input)}$(key+'Shape').textContent=`${rows} × ${cols}`;clearResult()}
function clearResult(){lastResult=null;$('resultGrid').replaceChildren();$('resultShape').textContent='';$('copy').disabled=true;$('message').textContent='Select an operation and calculate.';$('message').className='hint'}
function showError(message){$('message').textContent=message;$('message').className='hint error'}
function getNumeric(key){return readGrid(key).map((row,i)=>row.map((value,j)=>{if(value.trim()==='')throw Error(`Matrix ${key.toUpperCase()}, row ${i+1}, column ${j+1} is empty.`);const n=Number(value);if(!Number.isFinite(n))throw Error('Enter finite numbers only.');return n}))}
function selectOperation(op){operation=op;document.querySelectorAll('.op').forEach(b=>b.classList.toggle('active',b.dataset.op===op));$('rule').textContent=op==='multiply'?'Multiplication requires A columns to equal B rows.': 'Addition and subtraction require identical matrix dimensions.';clearResult()}
function matrixCalculate(a,b,op){
  const ar=a.length,ac=a[0].length,br=b.length,bc=b[0].length;
  if(op==='add'||op==='subtract'){
    if(ar!==br||ac!==bc)throw Error('Addition and subtraction require matrices with the same dimensions.');
    return a.map((row,i)=>row.map((value,j)=>op==='add'?value+b[i][j]:value-b[i][j]));
  }
  if(op==='multiply'){
    if(ac!==br)throw Error(`Multiplication requires A columns (${ac}) to equal B rows (${br}).`);
    return Array.from({length:ar},(_,i)=>Array.from({length:bc},(_,j)=>{
      let sum=0;
      for(let k=0;k<ac;k++)sum+=a[i][k]*b[k][j];
      return sum;
    }));
  }
  throw Error('Choose a valid operation.');
}
function calculate(){
  clearResult();
  try{
    const a=getNumeric('a'),b=getNumeric('b');
    lastResult=matrixCalculate(a,b,operation);
    if(lastResult.some(row=>row.some(value=>!Number.isFinite(value))))
      throw Error('Result exceeds the supported numeric range.');
    const grid=$('resultGrid');
    grid.style.gridTemplateColumns=`repeat(${lastResult[0].length}, max-content)`;
    for(const row of lastResult)for(const value of row){
      const cell=document.createElement('div');
      cell.className='cell';
      cell.textContent=Number(value.toPrecision(12)).toString();
      grid.append(cell);
    }
    $('resultShape').textContent=`${lastResult.length} × ${lastResult[0].length}`;
    $('message').textContent='Calculation completed.';
    $('copy').disabled=false;
  }catch(e){lastResult=null;showError(e.message)}
}
for(const key of ['a','b']){options($(key+'Rows'));options($(key+'Cols'));$(key+'Rows').addEventListener('change',()=>renderGrid(key));$(key+'Cols').addEventListener('change',()=>renderGrid(key))}
document.querySelectorAll('.op').forEach(b=>b.addEventListener('click',()=>selectOperation(b.dataset.op)));
$('calculate').addEventListener('click',calculate);
$('reset').addEventListener('click',()=>{setGrid('a',exampleA);setGrid('b',exampleB);selectOperation('add')});
$('swap').addEventListener('click',()=>{const a=readGrid('a'),b=readGrid('b');setGrid('a',b);setGrid('b',a)});
$('copy').addEventListener('click',async()=>{if(!lastResult)return;const text=lastResult.map(row=>row.join('\t')).join('\n');try{await navigator.clipboard.writeText(text);$('message').textContent='Result copied to clipboard.'}catch(e){showError('Clipboard access is unavailable in this browser.')}});
setGrid('a',exampleA);setGrid('b',exampleB);

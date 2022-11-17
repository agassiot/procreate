var formL = document.querySelector('#addform');
var delBtnL = document.querySelectorAll('.del-butt');
var treeL = document.querySelector('#tree-frame');
var makeL = document.querySelector('#generate');

delBtnL.forEach(x=>x.addEventListener('click', handleClick));
formL.addEventListener('submit', handleAdd);
makeL.addEventListener('click',fnSequence);



function fnSequence() {
  let children = document.querySelectorAll(`[name="member"]`); 
  let famIds = groupIDs(children);
  groupFams(famIds);
  makeCards();
};

async function handleAdd (e){
  e.preventDefault();
  
  let nameY = document.querySelector('#name-y').value.trim();
  let nameX = document.querySelector('#name-x').value.trim();
  let newname = document.querySelector('#name').value.trim();
  let famId = hashFam(nameX,nameY);
  
  if (newname && nameX && nameY) {
    await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ newname, nameX, nameY, famId }),
      headers: { 'Content-Type': 'application/json'},
    });
    
    return document.location.replace('/');
  }
};

async function handleClick(e){
  if (e.target.hasAttribute('data-id')) {
    let id = e.target.getAttribute('data-id');
    
    await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    return document.location.replace('/');
  }
};


function hashFam(x,y) {
  function joinHash(a,b,c) {
    let sum = `${a}${b}${c}`;
    return sum;
  }
  let splitx = x.split(''), splity = y.split(''); 
  let xArray = splitx.slice(0,2), yArray = splity.slice(0,2);
  
  let xCodes = xArray.map((x) => x.charCodeAt()), yCodes = yArray.map((y) => y.charCodeAt());
  let x1= xCodes[0], y1= yCodes[0];
  let z;
  x1 <= y1 ? z=[x1,y1] : z=[y1,x1];
  xCodes.unshift(y1); yCodes.unshift(x1);
  console.log(yCodes, "ycodes");
  let xhash = xCodes.reduce((x,xn)=> x*(x+xn)), yhash = yCodes.reduce((y,yn)=> (y*(y+yn)));
  let orderhash;
  x1 <= y1 ? orderhash = `${xhash}${yhash}` 
  : orderhash =`${yhash}${xhash}`;
  return joinHash(String.fromCharCode(z[0]),String.fromCharCode(z[1]),orderhash)
  
};

function groupIDs (array){
  let uniqueIDs = [];
  array.forEach(item=>{
    let id = item.getAttribute('data-fam');
    if(!uniqueIDs.includes(id)) uniqueIDs.push(id);
  });
  return uniqueIDs;
}

function groupFams (array) {
  array.forEach(item=>{
    let children = document.querySelectorAll(`[data-fam="${item}"]`);
    let newList = document.createElement("ul");
    newList.classList.add("siblings");
    children.forEach(child=>newList.appendChild(child))
    return treeL.appendChild(newList);
  })
}

function makeCards(){
  let kids = document.querySelectorAll('.siblings');
  
  kids.forEach(list=>{
    let newCardL = document.createElement('article');
    newCardL.classList.add("card");
    newCardL.classList.add("card-rounded");
    let parent1 = list.firstChild.getAttribute('data-namex');
    let parent2 = list.firstChild.getAttribute('data-namey');
    let headerL = document.createElement('h3');
    headerL.textContent = `${parent1}  &  ${parent2}`;
    headerL.classList.add('card');
    headerL.classList.add('card-header');
    headerL.classList.add('text-center');
    list.classList.add('card-body');
    newCardL.appendChild(headerL);
    newCardL.appendChild(list);
    return treeL.appendChild(newCardL);
  })
}




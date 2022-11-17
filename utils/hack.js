const spawnData = require("../seeds/spawnData.json");
const fs = require('fs');
const sequelize = require('../config/connection');
const Tree = require('../models/Tree');

var hack = require('../server');
let newData = hack;


var syncTree = (function iffy(data){
const hive = data.map((x)=>x);
hive.forEach((x)=> x.fam = setFam(x)); 
      
console.table(hive);
var famCopy = hive.map((x)=>x);

for(let i=0; i<famCopy.length;i++){
      famCopy.forEach((x)=>{ 
            if(x.nameX == famCopy[i].name || x.nameY == famCopy[i].name){
                  return x.descendant = famCopy[i].fam;
            }
      })
      };


for(let i=0; i<famCopy.length;i++){
      famCopy.forEach((x)=>{
            if(x.fam == famCopy[i].fam && !(x.name == famCopy[i].name)){
                  let cut = famCopy.indexOf(x);
                  famCopy[i].name += ` ${x.name}`;
            return famCopy.splice(cut,1);
            }
      });
}
console.table(famCopy);
 (async (famCopy) => {
      await sequelize.sync({ force: true });
    
       await Tree.bulkCreate(famCopy,{
         individualHooks: true,
         returning: true,
         });
    
      process.exit(0);
    }
)(famCopy);

return newData = famCopy;







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

function setFam(obj){
      let xname = obj.nameX, yname = obj.nameY;
      return hashFam(xname,yname);
}
})(newData);

function update(path){ ( ()=> {
      let Promise = JSON.stringify(newData);
       fs.writeFile('../seeds/treeData.json',Promise,'utf8', (err) =>{
err ? console.log(err) : console.log('Success!')
            return Promise;
});
})();
};

module.exports = { syncTree, update};

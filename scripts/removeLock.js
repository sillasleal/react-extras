const fs = require('fs');

if(fs.existsSync('./package-lock.json')){
  console.log('Removendo package-lock.json');    
  fs.unlinkSync('./package-lock.json');
  console.log('removido com sucesso');
}

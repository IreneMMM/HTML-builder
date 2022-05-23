const fs = require('fs');
const path = require('path');
const {copyFile} = require('fs/promises');

const oldFolder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'file-copy');

async function copyFolder() {

  fs.mkdir(newFolder, { recursive: true }, err => {
    if(err) throw err;
  });

  await fs.readdir(newFolder, { withFileTypes: true }, (err, files) => {
    if (err)
      throw err;
    for(let file of files) {
      fs.unlink(path.join(newFolder, file.name), err => {
        if (err)
          throw err;
      });
    }
  });

  fs.readdir(oldFolder, {withFileTypes : true}, (err, files) => {
    if(err) throw err;
    files.forEach(file => {
      copyFile(path.join(oldFolder, file.name), path.join(newFolder, file.name));
    });   
  });
}    

copyFolder();

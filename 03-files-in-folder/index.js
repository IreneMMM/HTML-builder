const path = require('path');
const fs = require('fs');
const { stdout } = process;
const folder = path.resolve(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes : true}, (err, files) => {
  if (err) { throw err;} 
  else {
    files.forEach(file => {
      if(file.isFile()) {
        fs.stat(path.join(folder, file.name), (err, stats) => {
          if (err) {
            throw err;
          } else {
            let pathextname = path.extname(file.name).slice(1);
            let pathbasename = path.basename(file.name).split('.', 1);
            let filesize = stats.size / 1000;
            stdout.write(`${pathbasename} - ${pathextname} - ${filesize}kb\n`);
          }
        });
      }
    });
  }
});

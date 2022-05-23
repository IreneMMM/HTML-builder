const path = require('path');
const fs = require('fs');

const stylesFolder = path.resolve(__dirname, 'styles');
const bundleFolder = path.resolve(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylesFolder, {
  withFileTypes: true
}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      if (path.extname(file.name) === '.css') {
        fs.readFile(path.resolve(stylesFolder, file.name), (err, data) => {
          if (err) {
            throw err;
          } else {
            fs.appendFile(bundleFolder, data, err => {
              if (err) throw err;
            });
          }
        });
      }
    }
  });
});

fs.writeFile(bundleFolder, '', err => {
  if (err) throw err;
});

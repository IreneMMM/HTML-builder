const fs = require('fs');
const path = require('path');
const readline = require('readline');

fs.createReadStream('02-write-file');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const {
  stdout
} = process;

fs.writeFile(path.join(__dirname, 'text.txt'), '', err => {
  if (err) throw err;
  stdout.write('Hi! Please write somthing: \n');

  rl.on('line', input => {
    if (input === 'exit') {
      rl.close();
    } else {
      fs.appendFile(path.join(__dirname, 'text.txt'), `${input}\n`, err => {
        if (err) throw err;
      });
    }
  });
});

rl.on('close', () => {
  stdout.write('Thank you! Bye!');
});

const fs = require('fs');
const fsText = fs.readFileSync('cafe_traceroutes.txt', 'utf-8');

console.log(fsText);
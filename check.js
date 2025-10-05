const fs = require('fs');
const text = fs.readFileSync('scripts.js', 'utf8');
const match = text.match(/inputHeader: '([^']+)'/);
if (match) {
  console.log(match[1]);
}

const fs = require('fs');

export const readFile = pathToFile => fs.readFileSync(pathToFile, 'utf8');

export const sleep = timeInMS => new Promise(resolve => setTimeout(resolve, timeInMS));

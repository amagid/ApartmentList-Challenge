const network = require('./network');

const startTime = (new Date).getTime();
console.log(`"LISTY" Network Size: ${network.calculateNetworkSize("LISTY")}`);
console.log(`Time Taken: ${(new Date).getTime() - startTime}ms`);
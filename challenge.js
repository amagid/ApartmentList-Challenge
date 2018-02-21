//Get functions for network calculation
const network = require('./network');
//Get dictionary
const dictionary = require('./dictionary.json');

//Benchmark and output
const startTime = (new Date).getTime();
console.log(`"LISTY" Network Size: ${network.calculateNetworkSize("LISTY", dictionary)}`);
console.log(`Time Taken: ${(new Date).getTime() - startTime}ms`);
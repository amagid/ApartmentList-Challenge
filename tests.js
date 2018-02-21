const assert = require('chai').assert;
const functions = require('./network').testing;
const fullDictionary = require('./dictionaries/dictionary_full.json');

describe('PreprocessDictionary', function () {
    it('Should sort the dictionary by word length, preserving alphabetization', function () {
        const input = ['HI', 'HERE', 'THERE', 'HER', 'HE', 'SHE', 'HEAR', 'HALLOW'];
        const result = functions.preprocessDictionary(input);

        assert.deepEqual(result, [
            ,
            ,
            ['HI', 'HE'],
            ['HER', 'SHE'],
            ['HERE', 'HEAR'],
            ['THERE'],
            ['HALLOW']
        ]);
    });
});

describe('EditDistanceOf1', function () {
    it('', function () {
        
    });
});

describe('ProcessNextWord', function () {
    it('', function () {
        
    });
});

describe('CalculateNetworkSize', function () {
    it('', function () {
        
    });
});
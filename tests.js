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
    it('Should return true when it\'s the same word', function () {
        const result = functions.editDistanceOf1("LISTY", "LISTY");
        assert.isTrue(result);
    });

    it('Should return true when only one letter has been changed', function () {
        const result = functions.editDistanceOf1("LISTY", "FISTY");
        assert.isTrue(result);
    });

    it('Should return false when two letters have been changed', function () {
        const result = functions.editDistanceOf1("LISTY", "FISTS");
        assert.isFalse(result);
    });

    it('Should return true when only one letter has been removed', function () {
        const result = functions.editDistanceOf1("PHONE", "PHON");
        assert.isTrue(result);
    });

    it('Should return true when only one letter has been added', function () {
        const result = functions.editDistanceOf1("PHON", "PHLON");
        assert.isTrue(result);
    });

    it('Should return false when we have an addition and a change', function () {
        const result = functions.editDistanceOf1("LIST", "FISTS");
        assert.isFalse(result);
    });

    it('Should return false when we have a removal and a change', function () {
        const result = functions.editDistanceOf1("LISTY", "FIST");
        assert.isFalse(result);
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
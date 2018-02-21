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

    it('Should be able to handle an empty dictionary', function() {
        const input = [];
        const result = functions.preprocessDictionary(input);

        assert.deepEqual(result, []);
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
    it('Should add friends to the queue in length then alpabetical order, and remove the processed word', function () {
        const dictionary = [
            ,
            ,
            ['HI', 'HE'],
            ['SHE'],
            ['HERE', 'HEAR'],
            ['THERE'],
            ['HALLOW']
        ];
        const queue = ["HER"];

        functions.processNextWord(queue, dictionary);

        assert.deepEqual(queue, [
            'HE', 'HERE', 'HEAR'
        ]);
    });

    it('Should remove friends from the dictionary so they won\'t be double-processed', function () {
        const dictionary = [
            ,
            ,
            ['HI', 'HE'],
            ['SHE'],
            ['HERE', 'HEAR'],
            ['THERE'],
            ['HALLOW']
        ];
        const queue = ["HER"];

        functions.processNextWord(queue, dictionary);

        assert.deepEqual(dictionary, [
            ,
            ,
            ['HI'],
            ['SHE'],
            [],
            ['THERE'],
            ['HALLOW']
        ]);
    });

    it('Should silently skip empty sublists in the dictionary', function () {
        const dictionary = [
            ,
            ,
            ,
            ,
            ,
            ['THERE'],
            ['HALLOW']
        ];
        const queue = ["HER"];

        functions.processNextWord(queue, dictionary);

        assert.deepEqual(queue, []);
    });

    it('Should gracefully handle the ends of the dictionary, when no sublists exist', function () {
        const dictionary = [];
        const queue = ["HER"];

        functions.processNextWord(queue, dictionary);

        assert.deepEqual(queue, []);
    });
});

describe('CalculateNetworkSize', function () {
    it('Should properly calculate the network size of the "HI" example set (7)', function () {
        const word = "HI";
        const dictionary = ['HI', 'HERE', 'THERE', 'HER', 'HE', 'SHE', 'HEAR', 'HALLOW'];

        const result = functions.calculateNetworkSize(word, dictionary);

        assert.equal(result, 7);
    });

    it('Should properly calculate the network size of a word with no friends', function () {
        const word = "HALLOW";
        const dictionary = ['HI', 'HERE', 'THERE', 'HER', 'HE', 'SHE', 'HEAR', 'HALLOW'];

        const result = functions.calculateNetworkSize(word, dictionary);

        assert.equal(result, 1);
    });

    it('Should complete the assigned task in less than 30 seconds', function() {
        const word = "LISTY";
        const startTime = (new Date).getTime();

        const result = functions.calculateNetworkSize(word, fullDictionary);
        const endTime = (new Date).getTime();
        assert.isBelow(endTime - startTime, 30000, `Execution took ${endTime - startTime}ms, which is over the 30000ms limit.`);
    }).timeout(30000);
});
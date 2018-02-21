//I use this format so that intended interfaces are clear, but all methods are easily accessible for testing.
//Module.exports included at top of file so that how to interface with a particular file / class is clear.
module.exports = {
    calculateNetworkSize,
    testing: {
        preprocessDictionary,
        editDistanceOf1,
        processNextWord,
        calculateNetworkSize
    }
};

//Organize the dictionary into a better-usable format
//Basically, we're organizing it by word length, since
//in order to have an edit distance of 1, two words have
//to be within 1 unit of length of each other.
function preprocessDictionary(dictionary) {
    //Output
    let organized = []
    //Iterate through dictionary, sort by word length
    for (let i = 0; i < dictionary.length; i++) {
        //If we don't have an entry for this word length yet,
        if (organized[dictionary[i].length] === undefined) {
            //create it.
            organized[dictionary[i].length] = [];
        }
        //Add word to list of words of this length
        organized[dictionary[i].length].push(dictionary[i]);
    }
    return organized;
}

//Check to see if the edit distance is 1 
function editDistanceOf1(word1, word2) {
    //Have we found a difference yet?
    let different = false;

    //Iterate through all letters in the words, checking equality
    for (let i = 0, j = 0; i < word1.length; i++, j++) {
        //If not equal here
        if (word1.charAt(i) !== word2.charAt(j)) {
            //If we've already found a difference, exit
            if (different) {
                return false;
            }
            //If not, set flag
            different = true;
            //Re-check this letter on the shorter word (different because this letter was removed?)
            if (word1.length < word2.length) {
                i--;
            } else if (word2.length < word1.length) {
                j--;
            }
        }
    }
    //If we haven't found two differences by this point, they're within 1 of each other.
    return true;
}

//Count this word and its friends
function processNextWord(queue, dictionary) {
    //Get the next word
    const word = queue.pop();

    //Store current list since we're going to access it a lot.
    let list;
    //Check lists where word length is within 1 of this word's length
    for (let i = -1; i < 2; i++) {
        list = dictionary[word.length + i];

        //Skip this if this list doesn't exist (no words of this length in initial dictionary)
        if (list) {
            //Iterate through words in this list
            for (let j = 0; j < list.length; j++) {
                //If this word is a friend of our word,
                if (editDistanceOf1(word, list[j])) {
                    //Add it to the queue and remove the word from our dictionary so we don't revisit.
                    queue.push(list.splice(j, 1)[0]);
                    //Update j so we don't skip words
                    j--;
                }
            }
        }
    }
}

//Calculate the network size of a starting word
function calculateNetworkSize(word, dict) {
    let networkSize = 0;
    let queue = [];
    //Preprocess dictionary for easy use
    let dictionary = preprocessDictionary(dict);
    //Add starting word to queue
    queue.push(word);
    //Remove starting word from dictionary so that it will never be revisited.
    dictionary[word.length].splice(dictionary[word.length].indexOf(word), 1);
    //As long as we still have words to process, keep processing
    while (queue.length > 0) {
        processNextWord(queue, dictionary);
        networkSize++;
    }
    return networkSize;
}
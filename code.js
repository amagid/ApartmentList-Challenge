(function (startWord) {
    const dict = ["FIST", "FISTS", "LISTS", "LISTY", "LIT", "LITAI", "LITANIES", "LITANY", "LITAS", "LITCHI", "LITCHIS", "LUSTY"];
    let networkSize = 0;

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
                organized[dictionary[i].length] = {};
            }
            //Set value of key to false - will use later to track visited words
            organized[dictionary[i].length][dictionary[i]] = false;
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
    function processWord(word, dictionary) {
        //Count this word
        networkSize++;
        //Set this word as visited
        dictionary[word.length][word] = true;

        //Store current list since we're going to access it a lot.
        let list;
        //Check lists where word length is within 1 of this word's length
        for (let i = -1; i < 2; i++) {
            list = dictionary[word.length + i];

            //Skip this if this list doesn't exist (no words of this length)
            if (list) {
                //Iterate through words in this list
                for (listWord in list) {
                    //If we haven't visited this word, and it's a friend of our word,
                    if (!list[listWord] && editDistanceOf1(word, listWord)) {
                        //Process it!
                        processWord(listWord, dictionary);
                    }
                }
            }
        }
        return networkSize;
    }

    //Start
    return processWord(startWord, preprocessDictionary(dict));

})("LISTY");
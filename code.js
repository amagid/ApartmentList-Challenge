(function () {
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
        //If we haven't found a difference by this point, they're within 1 of each other.
        return true;
    }
})();
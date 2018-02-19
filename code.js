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
})();
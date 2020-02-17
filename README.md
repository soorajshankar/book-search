# Initial Thoughts

1. Main method will have 2 inputs, query and maximum results limit, for modularity considering list of summaries also as an inputs
2. `number of instances of partial match` can be done by parsing keywords from the search query.
3. from the search query keywords (word groups) has to be generated, which can be words or word groups
   > if "is your problems" is the query
   > then the keywords are ['is', 'your','problems','is your','your problems','is your problems'] will be the keywords
   > Some logic has to be implemented for assigning weightage (more like NLP, but time is a factor :(
4. Basically whenever a search is triggered, each summary will be matched & counted on each keywords (N\*K looks okay at this point). Regex can do this at a low cost.
5. counts are multiplied with repetitions and all keyword score are totaled to get the search score on each summary ie: `SUM of each key words (weight* reps)`

## Assumptions

1. `number of instances of partial match` can be used as relevancy weightage.
2. giving auxilaries low weightage is fine for now.

## utils

1. Utility functions are stored at `src/utils/utils.js`

# Search Utility Changes

N\*K is a bit heavy at this stage, need to reduce it to N or even less 🧐
## regex to continuity word count logic

hitting each summary(N) with all possible keywords(K) can be simplified with the following logic

1. Each summary is traversed once, instead of applying regex test multiple times
2. Weightage is for word combinations (keywords) which is already calculated in the old logic.
3. While traversing the summary, whenever we get a match its weight is added to the search score
4. Besides, holding an accumulator call it `last` which will hold the last value if the last value was a match.
5. this gets checked additionally, and added additional score eg: if the summary contains `apple is your fruit` and your keyword is `is your problem` you get normal points for `is` and `your` also `is your` will be considered as additional points.
6. though the counting logic changed, the weightage remains the same

## Pre-filtering using indexed word count  summaries

1. indexing summaries with words can help searching more faster
2. while the system boots or on initial loading, generate an index word mapper, which contains all words as keys and value a Set
   eg: {
   book:Set([0,1,2,4,6]),
   fly:Set([2,5,7,11]),
   problem:Set([33,44,45]),
   }
   
3. Before searching if we get these sets (ids of summary) we just need to merge these sets 
eg: if keyword is `book`, `fly` before it starts iterating summaries, the ids to be computed are fetched from the indexed mapper 
so this won't iterate the entire summaries but,  merged Set([0,1,2,4,6,5,7,11])
4. Generating an indexed table is an expensive operation and it can be done once while booting up. and book insertion/update/deletion.

# UI/UX Changes 

UI/UX changes are made to align with the provided details

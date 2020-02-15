# Initial Thoughts

1. Main method will have 2 inputs, query and maximum results limit, for modularity considering list of summaries also as an inputs
2.  `number of instances of partial match`  can be done by parsing keywords from the search query.
3. from the search query keywords (word groups) has to be generated, which can be words or word groups
   > if "is your problems" is the query
   > then the keywords are ['is', 'your','problems','is your','your problems','is your problems'] will be the keywords
   > Some logic has to be implemented for assigning weightage (more like NLP, but time is a factor :( 
4. Basically whenever a search is triggered, each summary will be matched & counted on each keywords  (N*K looks okay at this point). Regex can do this at a low cost.
5. counts are multiplied with repetitions and all keyword score are totaled to get the search score on each summary ie: `SUM of each key words (weight* reps)`

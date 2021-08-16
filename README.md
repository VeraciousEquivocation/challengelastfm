# Coding Challenge with LastFm API, React, Typescript

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install and then npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

> #### Note: `Change the [API KEYS] in the request calls`  
You will find these in the GlobalContext file, and the ArtistCard index file

Material UI is utilized for quick style building  
Axios for request handling

The Global context houses the data shared amongst the components, and handles the main API call for the artists.

The app structure is broken into:  
```
    App
        -> Search Component 
            -> SearchField Component
            -> SearchResult Component
                -> [ ArtistCard, ... ]
```
The search field is broken into two parts, a search field, and a star icon. Clicking on the star icon will bring up a list of favorited artists. This star icon will only appear if the list has an entry.

The results field produces a list of arist cards.  
Each artist card can be expanded to show bio, published date, and if the artist is on tour or not  
Each artist can also be favorited by clicking on a star next to the name  

a typescript interface was utilized to sync the Artist Schematic type across the components  
type ArtistInfo was used in the card component, as that was the only place that was using the info.  
Upon expanding a card, the artist's info was fetched via the API and then the ArtistInfo type was used when setting the info from the returned json

Interesting caveats that had to be worked around, included using useeffects to make sure the mapped lists & favorites updated properly when switching between lists, and preventing card expansions firing when they shouldn't. You'll see these solutions as you review the code.

> #### Final Notes:

Things that I would add to improve this: 
* Error checking for the API calls. When an error occurs, such as a bad API key, etc, provide user feedback, and log it.
    * [x] ~~Search, similar artist, and tag api calls~~
* ~~Empty results feedback~~
* General error checking, for stuff like the favorites etc
* Testing, to make sure the what the user sees works
    * such as favoriting an item 
    * result cards rendering
    * the favorite cards rendering 
    * removal of a favorite while displaying favorites
* Figure out why the image provided from the API is only a grey star ( maybe paid feature )
    * Then use the image in the card
* A searh field to search top artists by tags, 
    * add autocomplete for top tags
    * permit multiple tag search, but their free api does not appear to handle such cases.
        * If it did, I would use removable chips inside the search for visual feedback to users, and an array for tracking them in code
* [x] ~~Add tags to cards, allow clicking on tag to bring up top artists~~
* [x] ~~Add "find similar" button to card to allow searching for similar artists~~
* Figure out if there's a way to filter this data more efficiently
    * quite a few resutls end up with dual artists if they've collabed etc
    * and you get results that also state "this is not an artist", but only in the artist info 
    * Due to how this currently works, I do not grab the artist info until they expand an artist card, so i cannot filter it
    * If the result number was limited, say top 10 matches, default is 30, then I may be able to perform a loop to grab each of the 10 artist's bios, which at that point i could filter.

# Coding Challenge with LastFm API, React, Typescript

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install and then npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

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

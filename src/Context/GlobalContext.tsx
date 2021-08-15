import React, { useEffect, useState } from "react";
import axios from 'axios';
// import cloneDeep from 'lodash.clonedeep'

import {ArtistSchematic} from '../interfaces/ArtistSchematic'

interface AppContextInterface {
    artistList: ArtistSchematic[];
    favoriteList: ArtistSchematic[];
    handleArtistSearch: Function;
    handleAddToFavorite: Function;
    handleFavoriteClick: Function;
    showFaves: boolean
    setShowFaves: Function
}

export const GlobalContext = React.createContext<AppContextInterface | null>(null);

function GlobalContextProvider(props:any) {
    const [artistList, setartistlist] = useState<ArtistSchematic[]>([]);
    const [favoriteList, setfavoritelist] = useState<ArtistSchematic[]>([]);
    const [showFaves, setShowFaves] = useState<boolean>(false)
    const [faveToArtist, setFaveToArtist] = useState<boolean>(false)

    useEffect(()=> {
        if(!faveToArtist) return
        if(showFaves) {
          handleShowFavorites(false)
        } else {
          handleShowFavorites(true)
        }
    },[faveToArtist])

    const handleArtistSearch = React.useCallback((searchString:string)=>{
        setartistlist([])
        setShowFaves(false)
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchString}&api_key=[API KEY]&format=json`)
        .then((response) => {
          setartistlist(response.data.results.artistmatches.artist)
        });
    },[])
    const handleAddToFavorite = React.useCallback((action:string,artistObj:ArtistSchematic)=>{
        let updatedArr:ArtistSchematic[];

        if(action === 'add') {
            updatedArr = [...favoriteList,artistObj]
            setfavoritelist(updatedArr)
        } else {
            updatedArr = favoriteList.filter(art => {
                return art.name !== artistObj.name
            })
            setfavoritelist(updatedArr)
            if(showFaves) {setartistlist(updatedArr)}
            if(updatedArr.length <= 0) setShowFaves(false)
        }
    },[favoriteList,showFaves])
    const handleShowFavorites = React.useCallback((show:boolean):void=>{
        if(show) {
            setartistlist(favoriteList)
            setShowFaves(true)
        } else {
            setartistlist([])
            setShowFaves(false)
        }
        setFaveToArtist(false)
    },[favoriteList])

    const handleFavoriteClick = React.useCallback(():void => {
        if(favoriteList.length <= 0) { 
            if(showFaves) setShowFaves(false)
            return
        }
        setartistlist([])
        setFaveToArtist(true)
      },[favoriteList,showFaves])


    const contextMemoData = React.useMemo(() => (
        {
            artistList,
            favoriteList,
            handleArtistSearch,
            handleAddToFavorite,
            handleFavoriteClick,
            showFaves,
            setShowFaves,
        }), 
        [
            artistList,
            favoriteList,
            handleArtistSearch,
            handleAddToFavorite,
            handleFavoriteClick,
            showFaves,
            setShowFaves,
        ]
    );

    return (
        <GlobalContext.Provider value={contextMemoData}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default React.memo(GlobalContextProvider);
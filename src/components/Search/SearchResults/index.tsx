import React,{useState, useContext} from 'react';
import scss from './searchfield.module.scss';
import Container from '@material-ui/core/Container';
import ArtistCard from './ArtistCard'
import {GlobalContext} from '../../../Context/GlobalContext'

import {ArtistSchematic} from '../../../interfaces/ArtistSchematic'

function SearchResults() {

  const {artistList} = useContext(GlobalContext)!

  if(!artistList || artistList.length <= 0) {
    return null
  }

  return (
    <Container maxWidth="md">
        {artistList.filter((art:ArtistSchematic) => {
          let re = /&|,|\/|(F|f)eat\.|and|⇑/
          return (!re.test(art.name))
        }).map((art:ArtistSchematic,idx) => {
          return (<ArtistCard artist={art} key={idx} />)
        })}
    </Container>
  );
}

export default SearchResults; 
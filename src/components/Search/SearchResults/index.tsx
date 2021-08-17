import React,{useContext, useEffect, useRef} from 'react';
import Container from '@material-ui/core/Container';
import ArtistCard from './ArtistCard'
import {GlobalContext} from '../../../Context/GlobalContext'
import ErrorCard from './ErrorCard'
import {ArtistSchematic} from '../../../interfaces/ArtistSchematic'

function SearchResults() {
  const firstUpdate = useRef(true);

  useEffect(()=>{
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

  },[])

  const {artistList,apiErr} = useContext(GlobalContext)!

  if(!artistList && !apiErr) {
    return null
  }
  if(artistList.length <= 0 && !firstUpdate.current && !apiErr) {
    return (
      <ErrorCard open={true} zeroResults={true}/>
    )
  }

  return (
    <Container maxWidth="md">
        {artistList.filter((art:ArtistSchematic) => {
          let re = /&|,|\/|(F|f)eat\.|and|⇑/
          return (!re.test(art.name))
        }).map((art:ArtistSchematic,idx) => {
          return (<ArtistCard artist={art} key={idx} />)
        })}
        <ErrorCard open={apiErr} />
    </Container>
  );
}

export default SearchResults; 
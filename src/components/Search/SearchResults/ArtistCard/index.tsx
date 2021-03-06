import React,{useEffect, useRef, useState, useContext} from 'react';
import scss from './artistcard.module.scss';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import axios from 'axios';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import {GlobalContext} from '../../../../Context/GlobalContext'

import {ArtistSchematic} from '../../../../interfaces/ArtistSchematic'

type ArtistInfo = {
  content: string
  published: string
  summary: string
  ontour: boolean
  url: string
}
// artist:
// bio: {links: {…}, published: "11 Feb 2006, 04:03", summary: "Carissa's Wierd is an indie rock band which formed…music/Carissa%27s+Wierd\">Read more on Last.fm</a>", content: "Carissa's Wierd is an indie rock band which formed…ommons By-SA License; additional terms may apply."}
// image: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// mbid: "4bd31567-70a8-4007-9ac6-3c68c7fc3d45"
// name: "Carissa's Wierd"
// ontour: "0"
// similar: {artist: Array(5)}
// stats: {listeners: "142569", playcount: "7332647"}
// streamable: "0"
// tags: {tag: Array(5)}
// url: "https://www.last.fm/music/Carissa%27s+Wierd"

type Props = {
  artist: ArtistSchematic
}
const Artistcard:React.FC<Props> = ({artist}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [isFave, setisfave] = React.useState<boolean>(false);
  const [info, setinfo] = React.useState<any>();

  const {favoriteList,handleAddToFavorite} = useContext(GlobalContext)!

  const firstUpdate = useRef(true);

  useEffect(()=>{
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if(!info) return

    handleExpand()
  },[info])

  useEffect(()=>{
    setExpanded(false)
    setinfo(null)
  },[artist])
  useEffect(()=>{
    setisfave(!!(favoriteList.find(art => {
      return art.name === artist.name
    })))
  },[favoriteList])

  const handleFetchInfo = () => {
    if(info) {
      handleExpand()
      return
    }
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist.name}&api_key=[API KEY]&format=json`)
    .then((response) => {
      let {content, summary,published} = response.data.artist.bio
      let tempObj:ArtistInfo = {
        content,
        summary,
        published,
        ontour: !!parseInt(response.data.artist.ontour),
        url: response.data.artist.url
      }
      setinfo(tempObj)
    });
  }
  const handleExpand = ():void => {
    setExpanded(oldVal => !oldVal)
  }
  const handleOnClick = ():void => {
    if(!expanded)
      handleFetchInfo()
    else
      handleExpand()
  }
  const handleFavoriteClick = (e:React.MouseEvent<HTMLElement>):void => {
    e.stopPropagation()
    let action = isFave ? 'remove' : 'add'
    handleAddToFavorite(action,artist)
  }

  return (
    <Card className={scss.root} onClick={handleOnClick}>
      <div className={scss.cardrow}>
        <div className={scss.details}>
          <CardContent className={scss.content}>
            <Typography component="h5" variant="h5">
              {artist.name}
            </Typography>
          </CardContent>
        </div>
        <IconButton onClick={e=>handleFavoriteClick(e)}>
          {isFave ? <StarIcon className={scss.isFave} />
          : <StarOutlineIcon />
          }
        </IconButton>
        {/* {artist.image[2] &&
        <img 
          className={scss.cover}
          src={artist.image[2]['#text']}
        />
        } */}
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {info &&
            <>
            <Container>
            {(info.content && info.content.trim() !== '' && info.summary.replace(/<a.*>.*<\/a>/g,'').trim() !== '') &&
              <>
              <Typography paragraph>Bio</Typography>
              <Typography paragraph>
                {info.summary.replace(/<a .*>.*<\/a>/g,'')}
              </Typography>
              </>
            }
            <Typography>
              Published
            </Typography>
            <Typography>
              {info.published}
            </Typography>
            <Typography variant={info.ontour ? 'h3' : 'h5'} paragraph>
              {info.ontour && <AirportShuttleIcon className={scss.touricon} fontSize='large' />}
              {info.ontour ? 'On Tour!' : 'not on tour'}
              {info.ontour && <AirportShuttleIcon className={scss.touricon} fontSize='large' />}
            </Typography>
            </Container>
            </>
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Artistcard; 
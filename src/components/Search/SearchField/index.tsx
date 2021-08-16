import React,{useState, useContext} from 'react';
import scss from './searchfield.module.scss';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';

import {GlobalContext} from '../../../Context/GlobalContext'

function SearchField() {

  let [value, setvalue] = useState<string>('')

  const {
    handleArtistSearch,
    handleFavoriteClick,
    showFaves,
    // setShowFaves,
    favoriteList } = useContext(GlobalContext)!
  
  const handleOnSubmit = (ev:React.ChangeEvent<HTMLInputElement>): void => {
    ev.preventDefault()
    if(value.trim() !== '' && handleArtistSearch)
      handleArtistSearch(value)
  }
  const handleOnChange = (ev:React.ChangeEvent<HTMLInputElement>): void => {
      setvalue(ev.target.value)
  }
  return (
    <Container maxWidth="sm">
      <div className={scss.row}>
      <Paper component="form" className={scss.root} onSubmit={handleOnSubmit}>
        <InputBase
          className={scss.input}
          value={value}
          placeholder="Search Artists"
          inputProps={{ 'aria-label': 'search artists' }}
          onChange={handleOnChange}
        />
        <IconButton type="submit" className={scss.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {favoriteList.length > 0 &&
      <Paper className={scss.starPaper}>
        <IconButton onClick={()=>{setvalue(''); handleFavoriteClick();}}>
          {showFaves ? <StarIcon className={clsx(scss.isFave, scss.iconFaveBtn)} />
          : <StarOutlineIcon className={scss.iconFaveBtn} />
          }
        </IconButton>
      </Paper>
      }
      </div>
    </Container>
  );
}

export default SearchField; 
import React from 'react';
import {BaseSyntheticEvent} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

type SearchProps = {
    handleSongData: (event: BaseSyntheticEvent) => void;
    handleSubmit: () => void;
}

function Search({handleSongData, handleSubmit}: SearchProps){

    return(
    <div className="data">
        <h2>Search for a song</h2>
        <TextField id="title" name="title" label="Title" variant="outlined" onChange={handleSongData}/>
        <br /><br/>
        <TextField id="author" name="author" label="Author" variant="outlined" onChange={handleSongData}/>
        <br /><br />
        <Button 
            variant="contained" 
            startIcon={<SearchIcon/>} 
            id="search" 
            onClick={handleSubmit}
        >
            <Link to="/lyrics">Search</Link>
        </Button>
    </div>
    );

}

export default Search;
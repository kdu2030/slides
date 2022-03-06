import React, {BaseSyntheticEvent, MouseEventHandler} from 'react';
import { Paper } from '@mui/material';
import { RawLyrics } from './App';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { SelectedLyric } from './App';
import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';


/*
NOTE: {} is called destructuring, it pulls out a property from an object.
We need {} around RawLyrics because we are pulling out the RawLyrics type from App.tsx
If App.tsx has a export default, then we don't need destructuring because Javascript knows
what object to pull out
*/

type LyricsProps = {
    rawLyrics: RawLyrics;
    handleSelect: (event: BaseSyntheticEvent) => void;
    handleDelete: (part: number) => void;
    selected: Array<SelectedLyric>;
    loading: boolean;
}


function Lyrics({ rawLyrics, handleSelect, handleDelete, selected, loading }: LyricsProps) {

    const buttonStyle = {
        marginTop: '10px',
        marginLeft: '615px',
    }as const;

    function showRawLyrics(rawLyrics: RawLyrics) {
        let keys = Object.keys(rawLyrics);
        let allLyrics = "";
        for (let i = 0; i < keys.length; i++) {
            allLyrics += `${keys[i]} \n ${rawLyrics[keys[i]]}`;
        }
        return allLyrics.split("\n");
    }

    function handleClick(event: BaseSyntheticEvent){
        let link = document.getElementsByTagName("a")[0];
        if(link !== null){
            link.click();
        }
    }

    return (
        <div className="lyrics">
            <h2>Lyrics</h2>
            {loading && <LinearProgress sx={{marginTop: '10px', marginBottom: '10px', width:'800px'}}/> }
            <Paper id="lyric-view">
                {showRawLyrics(rawLyrics).map(str => <p>{str}</p>)}
            </Paper>
          
            <p><strong>Parts</strong></p>

            <div className="parts-list">
                {Object.keys(rawLyrics).map(label => <Chip label={label} onClick={handleSelect} variant="outlined" />)}
            </div>

            <Paper id="selected" sx={{minHeight: '38px', maxHeight: '76px', overflow: 'auto'}}>
                {selected.map(part => <Chip label={part.label} onDelete={() => handleDelete(part.key)}/>)}
            </Paper>

            <Button 
                variant="contained" 
                startIcon={<AudiotrackIcon/>} 
                onClick={handleClick}
                sx={buttonStyle}> 
                <Link to="/image">Set Progression</Link>
            </Button>
        </div>
    )

}

export default Lyrics;
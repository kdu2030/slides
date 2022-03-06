import React from 'react';
import './App.css';
import Search from './Search';
import Lyrics from './Lyrics';
import Image from './Image';
import { BaseSyntheticEvent, useState, MouseEventHandler} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert  from '@mui/material/Alert';

type SongData = {
  [key: string]: string;
  title: string;
  author: string;
}

export type RawLyrics = {
  [key: string]: string;
}

export type SelectedLyric = {
  [key: string]: string | number;
  label: string;
  key: number;
}


function App() {
  const [maxKey, setMaxKey] = useState(0);
  const [songData, setSongData] = useState<SongData>({ title: "", author: "" });
  const [rawLyrics, setRawLyrics] = useState<RawLyrics>({});
  const [selected, setSelected] = useState<Array<SelectedLyric>>([]);
  const [filePath, setFilePath] = useState("No File Selected");
  const [imgFile, setImgFile] = useState();
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [warningOpen, setWarningOpen] = useState(false);
  
  function handleSongData(event: BaseSyntheticEvent) {
    if (event.target.name === "title" || event.target.name === "author") {
      songData[event.target.name] = event.target.value;
    }
  }

  function handleSearch() {
    setLoading(true);
    fetch(`https://worship-slides-data.herokuapp.com/data?title=${songData.title}&author=${songData.author}`)
      .then((response) => response.json())
      .then((data) => {
        setRawLyrics(data);
        setLoading(false);
      })
      .catch((error) => {
        setWarning(`Error: Lyrics were unable to be loaded`);
        setWarningOpen(true);
      });
  }

  function handleSelect(part: BaseSyntheticEvent){
    let newSelected = selected.slice(0, selected.length);
    newSelected.push({label: part.target.innerText, key: maxKey});
    setSelected(newSelected);
    setMaxKey(maxKey + 1);
  }

  function handleDelete(part: number){
    let newSelected = selected.slice(0, selected.length);
    newSelected = newSelected.filter((lyricPart) => lyricPart.key !== part);
    setSelected(newSelected);
  }

  function handleFile(event: BaseSyntheticEvent){
    setFilePath(event.target.value);
    setImgFile(event.target.files[0]);
  }

  function handleSubmit(event: BaseSyntheticEvent){
     //https://attacomsian.com/blog/uploading-files-using-fetch-api
     let formData = new FormData();
     if (imgFile !== undefined){
        formData.append('file', imgFile);
     }
     
     //Constructing progression string
     let progression = "";
     let parts = Object.keys(rawLyrics);
     for(let i = 0; i < selected.length; i++){
       //Get the index of the part
       progression += " " + parts.indexOf(selected[i]["label"]);
     }
     progression = progression.slice(1);

     formData.append('lyrics', JSON.stringify(rawLyrics));
     formData.append('order', progression);

     formData.append('title', songData['title']);

     fetch('https://worship-slides-data.herokuapp.com/generate', {
      method: 'POST',
      body: formData, 
     })
     .then((response) => response.blob())
     .then((data) => {
       //https://code-boxx.com/download-file-javascript-fetch/
       let downloadLink = document.createElement('a');
       downloadLink.href = window.URL.createObjectURL(data);
       downloadLink.click();
     })
     .catch((error) => {
       setWarning("Error: Slides were unable to be created");
       setWarningOpen(true);
     });


  }

  function handleWarning(){
    setWarningOpen(false);
  }


  return (
    <div className="App">
      <Snackbar open={warningOpen} autoHideDuration={5000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={handleWarning}>
        <Alert severity="error" variant="filled">{warning}</Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={<Search handleSongData={handleSongData} handleSubmit={handleSearch} />} />
        <Route path="/lyrics" element={<Lyrics rawLyrics={rawLyrics} handleSelect={handleSelect} selected={selected} handleDelete={handleDelete} loading={loading} />} />
        <Route path="/image" element={<Image handleUpload={handleFile} fileName={filePath} handleSubmit={handleSubmit} />} />
      </Routes>
    </div>
  );
}

export default App;

import { BaseSyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

type ImageProps = {
    handleUpload: (event: BaseSyntheticEvent) => void;
    handleSubmit: (event: BaseSyntheticEvent) => void;
    fileName: string;
}

function Image({ handleUpload, handleSubmit, fileName }: ImageProps) {

    function handleFileChoose() {
        //File upload input is invisible to the user.
        //Clicks the invisible upload button to get Windows Explorer window
        let fileButton = document.getElementById('backimg');
        if (fileButton !== null) {
            fileButton.click();
        }
    }

    function displayFileName() {
        let lastSlash = fileName.lastIndexOf("\\");
        if (lastSlash !== -1) {
            return fileName.slice(lastSlash + 1);
        }
        return "No File Selected";
    }

    function handleClick(event: BaseSyntheticEvent){
        let link = document.getElementsByTagName("a")[0];
        if(link !== null){
            link.click();
        }
    }

    return (
        <div className="Image">
            <h2>Pick Background Image</h2>
            <input type="file" id="backimg" onChange={handleUpload} accept="image/jpeg,image/png" />
            <Button variant="contained" startIcon={<FileUploadIcon />} onClick={handleFileChoose}>Choose File</Button>
            <p id="filename">{displayFileName()}</p>
            <br />
            <Button variant="outlined" startIcon={<ArrowBackIcon/>} onClick={handleClick} id="back"><Link to="/lyrics">Back</Link></Button>
            <Button variant="contained" startIcon={<SendIcon />} id="generate" onClick={handleSubmit}>Generate</Button>    
        </div>
    )
}

export default Image;
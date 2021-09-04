import React, { useState, useEffect, useCallback } from "react";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import DZArea from "../components/DropZoneArea";

import LinearProgress from '@material-ui/core/LinearProgress';

import { chunkSize } from "../config";

const Home = () => {
    const [file, setFile] = useState({});
    const [fileId, setFileId] = useState("");
    const [cCount, setCCount] = useState(0);
    const [index, setIndex] = useState(1);
    const [bIndex, setBIndex] = useState(0);
    const [eIndex, setEIndex] = useState(chunkSize);
    const [progress, setProgress] = useState(0);
    const [bufferProgress, setBufferProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    const uploadChunk = useCallback(async chunk => {
        try {
            const response = await axios.post("http://localhost:5000/uploadChunk", chunk, {
                params: {
                    id: index,
                    fileName: fileId
                },
                headers: { 'Content-Type': 'application/json' }
            })
            const data = response.data;
            console.log(data);
        } catch (e) {
            console.log(e)
        }
        // try {
        //     debugger
        //     const response = await axios.post("https://localhost:44356/weatherforecast/UploadChunks", chunk, {
        //         params: {
        //             id: counter,
        //             fileName: fileGuid,
        //         },
        //         headers: { 'Content-Type': 'application/json' }
        //     });
        //     debugger
        //     const data = response.data;
        //     if (data.isSuccess) {
        //         setBeginingOfTheChunk(endOfTheChunk);
        //         setEndOfTheChunk(endOfTheChunk + chunkSize);
        //         if (counter == chunkCount) {
        //             console.log('Process is complete, counter', counter)
        //             await uploadCompleted();
        //         } else {
        //             var percentage = (counter / chunkCount) * 100;
        //             setProgress(percentage);
        //         }
        //     } else {
        //         console.log('Error Occurred:', data.errorMessage)
        //     }
        // } catch (error) {
        //     debugger
        //     console.log('error', error)
        // }
    }, [index, fileId, cCount, eIndex]);

    const fileUpload = useCallback(() => {
        if (index <= cCount) {
            const chunk = file.slice(bIndex, eIndex);
            setBufferProgress(index / cCount * 100);
            uploadChunk(chunk);
            setIndex(index + 1);
        }
    }, [bIndex, eIndex, cCount, file, index, uploadChunk]);

    const resetChunkProperties = () => {
        setShowProgress(true)
        setProgress(0)
        setIndex(1)
        setBIndex(0)
        setEIndex(chunkSize)
    }

    const uploadFiles = (files) => {
        const _file = files[0];
        if (_file) {
            resetChunkProperties();
            const _totalCount = _file.size % chunkSize === 0 ? _file.size / chunkSize : Math.floor(_file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
            const _fileID = uuidv4() + "." + _file.name.split('.').pop();
            setFileId(_fileID);
            setCCount(_totalCount);
            setFile(_file);
        }
    }

    useEffect(() => {
        if (file.size > 0) {
            fileUpload();
        }
    }, [file, fileUpload]);
    return (
        <>
            <DZArea uploadFiles={uploadFiles} />
            {showProgress && <LinearProgress variant="buffer" style={{ height: 12 }} value={progress} valueBuffer={bufferProgress} />}
        </>
    )
}

export default Home;
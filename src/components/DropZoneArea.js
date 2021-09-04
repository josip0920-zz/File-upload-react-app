import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

const DZArea = ({ uploadFiles }) => {
    const handleChange = (files) => {
        uploadFiles(files);
    }
    return (
        <DropzoneArea
            maxFileSize={50000000000}
            filesLimit={1}
            acceptedFiles={["video/*"]}
            onChange={handleChange}
        />
    )
}

export default DZArea;

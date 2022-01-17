import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';

// set accept file type
export default function UploadButtons({ filename, setUpLoadFile }) {
  const [fileName, setFileName] = useState(filename);

  const handleUploadFile = (file) => {
    const newFile = Object.keys(file).map((key) => file[key]);
    setUpLoadFile(newFile);
    setFileName(file[0].name);
  };

  return (
    <>
      <label htmlFor="upload-file">
        <input
          style={{ display: 'none' }}
          id="upload-file"
          type="file"
          accept=".zip"
          onChange={(e) => handleUploadFile(e.target.files)}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" component="span" style={{ borderRadius: 15 }}>
            Browse
          </Button>
          <Typography variant="body1" style={{ marginLeft: '20px' }}>
            {fileName}
          </Typography>
        </div>
      </label>
    </>
  );
}

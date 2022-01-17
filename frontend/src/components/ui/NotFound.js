import React from 'react';
import { Typography } from '@material-ui/core';

export default function NotFound() {
  return (
    <div style={{
      width: '100%', height: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex',
    }}
    >
      <Typography variant="h4">This page is not found.</Typography>
    </div>
  );
}

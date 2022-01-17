import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function Loading() {
  return (
    <div style={{
      width: '100%', height: '70%', justifyContent: 'center', alignItems: 'center', display: 'flex',
    }}
    >
      <CircularProgress size={80} thickness={1.2} color="primary" />
    </div>
  );
}

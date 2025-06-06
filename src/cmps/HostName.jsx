import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function HostName() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" name="name" label="Stay name" variant="outlined" />
      {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
    </Box>
  );
}
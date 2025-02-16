import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import wifi from '../assets/amenities-icons/wifi.svg'
import kitchen from '../assets/amenities-icons/kitchen.svg'
import sharedBeachAccess from '../assets/amenities-icons/shared-beach-access.svg'
import airConditioner from '../assets/amenities-icons/air-conditioner.svg'

export default function CheckboxLabels() {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Shared beach access" />
      <FormControlLabel control={<Checkbox />} label="Wifi" />
      <FormControlLabel control={<Checkbox />} label="Air conditioning" />
      <FormControlLabel control={<Checkbox />} label="Kitchen" />
    </FormGroup>
  );
}

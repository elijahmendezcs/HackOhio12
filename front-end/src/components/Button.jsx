import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function ContainedButton() {
  const navigate = useNavigate();  

  const handleClick = () => {
    navigate('/home');  
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={handleClick}>
        Get Started
      </Button>
    </Stack>
  );
}
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
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          marginBottom: '24px',
          backgroundColor: '#BB0000', // Scarlet color
          color: '#fff', // White text
          '&:hover': {
            backgroundColor: '#4A4A4A', // Gray color for hover
          },
        }}
      >
        Get Started
      </Button>
    </Stack>
  );
}

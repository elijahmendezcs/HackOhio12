import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function ContainedButton() {
  const navigate = useNavigate();  // Hook to programmatically navigate

  const handleClick = () => {
    navigate('/home');  // Navigate to '/home' when the button is clicked
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={handleClick}>
        Get Started
      </Button>
    </Stack>
  );
}
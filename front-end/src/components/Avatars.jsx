import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Elijah" src="/static/images/avatar/1.jpg" />
      <Avatar alt="JD" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Mohamed" src="/static/images/avatar/3.jpg" />
      <Avatar alt ="Nate" src="" />
    </Stack>
  );
}

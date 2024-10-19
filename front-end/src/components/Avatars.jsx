import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Elijah" src="/Users/mohagany/Documents/GitHub/HackOhio12/front-end/src/Avatars/My-Boy-Elijah.jpeg" />
      <Avatar alt="JD" src="/Users/mohagany/Documents/GitHub/HackOhio12/front-end/src/Avatars/My-Boy-JD.jpeg" />
      <Avatar alt="Mohamed" src="/Users/mohagany/Documents/GitHub/HackOhio12/front-end/src/Avatars/Meeeeeee.jpeg" />
      <Avatar alt ="Nate" src="/Users/mohagany/Documents/GitHub/HackOhio12/front-end/src/Avatars/IMG_0949.JPG" />
    </Stack>
  );
}

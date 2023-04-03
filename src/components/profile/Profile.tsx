import { Avatar, Card, CardContent, Box, Stack, Paper, styled } from '@mui/material';
import React from 'react';
import './Profile.scss';
import { User } from '../../api/UsersService';

interface Props {
  user: User | undefined;
}

interface ItemProps {
  title: string;
  value?: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ProfileItem: React.FC<ItemProps> = ({title, value}) => {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 2 }}>
      <Item className="user-profile-item"
        sx={{
          my: 1,
          mx: 'auto',
          p: 1,
        }}
      >
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
          <h3>{title}:</h3>
          <p>{value}</p>
        </Stack>
      </Item>
    </Box> 
  )
}


const Profile: React.FC<Props> = ({ user }) => {
  return (
    <Card className="user-profile">
      <CardContent>
        {user?.firstName && <Avatar className='user-avatar'
          alt={user?.firstName}
          src={user?.avatar}
          >{user?.firstName[0]}</Avatar>
        }
        <div className="user-details">
          <ProfileItem title='First Name' value={user?.firstName}/>
          <ProfileItem title="Last Name" value={user?.lastName}/>
          <ProfileItem title="Email" value={user?.email}/>
          <ProfileItem title="Registration Date" value={user?.registrationDate}/>
          <ProfileItem title="Role" value={user?.role}/>
          {user?.bio && <ProfileItem title="Bio" value={user?.bio}/>}
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
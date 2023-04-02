import { Avatar, Card, CardContent } from '@mui/material';
import React from 'react';

interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

interface Props {
  user: User;
}

const Profile: React.FC<Props> = ({ user }) => {
  return (
    <div className="user-profile">
      <Avatar
        alt={user.name}
        src={user.avatar}
        sx={{ width: 56, height: 56 }}
        />
      <div className="user-details">
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                {user.bio && <p>{user.bio}</p>}
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
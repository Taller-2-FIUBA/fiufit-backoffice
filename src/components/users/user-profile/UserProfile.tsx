import { Avatar, Card, CardContent, Box} from '@mui/material';
import React from 'react';
import './UserProfile.scss';
import { User } from '../../../api/UsersService';
import ModalItem from '../../common/modal-item/ModalItem';

interface UserProfileProps {
  user: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({user}) => {
  return (
    <Card className="user-profile">
      <CardContent className='user-profile-content'>
        {user &&
          <Box>
            <Avatar className='user-avatar'
              alt={user?.username}
              src={user?.avatar}
            ></Avatar>
            <p className='user-name'>{user?.username}</p>
            <Box className="user-details" sx={{ flexGrow: 1, overflow: 'hidden'}}>
              <ModalItem title='Name' value={user?.name} icon="Person"/>
              <ModalItem title="Surname" value={user?.surname} icon="Person"/>
              <ModalItem title="Email" value={user?.email} icon="Email"/>
              <ModalItem title="Registration Date" value={user?.registration_date} icon="CalendarToday"/>
              <ModalItem title="Birth Date" value={user?.birth_date} icon="Cake"/>
              <ModalItem title="Location" value={user?.location} icon="LocationOn"/>
              <ModalItem title="Weight" value={user?.weight?.toString()} />
              <ModalItem title="Height" value={user?.height?.toString()} />
              <ModalItem title="Role" value={user?.is_athlete ? "Athlete" : "Trainer"} />
            </Box>
          </Box>
        } 
      </CardContent>
    </Card>
  );
};

export default UserProfile;
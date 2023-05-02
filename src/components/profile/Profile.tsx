import { Avatar, Card, CardContent, Box, Stack} from '@mui/material';
import React from 'react';
import './Profile.scss';
import { useUserData } from '../../api/UsersService';
import { useParams } from 'react-router-dom';
import * as MUIcon from "@mui/icons-material";

interface ItemProps {
  title: string;
  value?: string;
  icon?: keyof typeof MUIcon
}

const ProfileItem: React.FC<ItemProps> = ({title, value, icon}) => {
  const Icon = icon && MUIcon[icon]
  return (
    <Stack className='profile-item' spacing={2} direction="row" alignItems="center" justifyContent="space-between" >
      <div className='icon-title-container'>
        {Icon && <Icon fontSize="medium" sx={{ px: 1 }}/>}
        <h3 className='profile-item-title'>{title}</h3>
      </div>
      <p>{value}</p>
    </Stack>
  )
}


const Profile = () => {
  const { userId } = useParams();
  const { data } = useUserData(userId);

  return (
    <Card className="user-profile">
      <CardContent>
        {data &&
          <Box>
            <Avatar className='user-avatar'
              alt={data?.username}
              src={data?.avatar}
            ></Avatar>
            <p className='user-name'>{data?.username}</p>
            <Box className="user-details" sx={{ flexGrow: 1, overflow: 'hidden'}}>
              <ProfileItem title='Name' value={data?.name} icon="Person"/>
              <ProfileItem title="Surname" value={data?.surname} icon="Person"/>
              <ProfileItem title="Email" value={data?.email} icon="Email"/>
              <ProfileItem title="Registration Date" value={data?.registration_date} icon="CalendarToday"/>
              <ProfileItem title="Birth Date" value={data?.birth_date} icon="Cake"/>
              <ProfileItem title="Location" value={data?.location} icon="LocationOn"/>
              <ProfileItem title="Weight" value={data?.weight?.toString()} />
              <ProfileItem title="Height" value={data?.height?.toString()} />
              <ProfileItem title="Role" value={data?.is_athlete ? "Athlete" : "Trainer"} />
            </Box>
          </Box>
        } 
      </CardContent>
    </Card>
  );
};

export default Profile;
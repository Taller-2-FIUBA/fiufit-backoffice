import { Avatar, Card, CardContent, Box, Stack } from "@mui/material";
import React from "react";
import "./Profile.scss";
import { User, getUser } from "../../api/UsersService";
import { useParams } from "react-router-dom";
import * as MUIcon from "@mui/icons-material";

interface ItemProps {
  title: string;
  value?: string;
  icon?: keyof typeof MUIcon;
}

const ProfileItem: React.FC<ItemProps> = ({ title, value, icon }) => {
  const Icon = icon && MUIcon[icon];
  return (
    <Stack
      className="profile-item"
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <div className="icon-title-container">
        {Icon && <Icon fontSize="medium" sx={{ px: 1 }} />}
        <h3 className="profile-item-title">{title}</h3>
      </div>
      <p>{value}</p>
    </Stack>
  );
};

const Profile = () => {
  const [user, setUser] = React.useState<User | undefined>();
  const { userId } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const token = "123"; // TODO
      const data: User | undefined = await getUser(token, userId);
      setUser(data);
    };

    fetchData().catch(console.error);
  }, [userId]);

  return (
    <Card className="user-profile">
      <CardContent>
        {user && (
          <div>
            <Avatar
              className="user-avatar"
              alt={user?.username}
              src={user?.avatar}
            ></Avatar>
            <p className="user-name">{user?.username}</p>
          </div>
        )}
        <Box className="user-details" sx={{ flexGrow: 1, overflow: "hidden" }}>
          <ProfileItem title="Name" value={user?.name} icon="Person" />
          <ProfileItem title="Surname" value={user?.surname} icon="Person" />
          <ProfileItem title="Email" value={user?.email} icon="Email" />
          <ProfileItem
            title="Registration Date"
            value={user?.registration_date}
            icon="CalendarToday"
          />
          <ProfileItem
            title="Birth Date"
            value={user?.birth_date}
            icon="Cake"
          />
          <ProfileItem
            title="Location"
            value={user?.location}
            icon="LocationOn"
          />
          <ProfileItem title="Weight" value={user?.weight?.toString()} />
          <ProfileItem title="Height" value={user?.height?.toString()} />
          <ProfileItem
            title="Role"
            value={user?.is_athlete ? "Athlete" : "Trainer"}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Profile;

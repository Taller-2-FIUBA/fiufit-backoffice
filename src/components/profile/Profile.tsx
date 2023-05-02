import {
  Avatar,
  Card,
  CardContent,
  Box,
  Stack,
  Paper,
  styled,
} from "@mui/material";
import React from "react";
import "./Profile.scss";
import { User, getUser } from "../../api/UsersService";
import { useParams } from "react-router-dom";

interface ItemProps {
  title: string;
  value?: string;
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProfileItem: React.FC<ItemProps> = ({ title, value }) => {
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 2 }}>
      <Item
        className="user-profile-item"
        sx={{
          my: 1,
          mx: "auto",
          p: 1,
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h3>{title}:</h3>
          <p>{value}</p>
        </Stack>
      </Item>
    </Box>
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
          <Avatar
            className="user-avatar"
            alt={user?.username}
            src={user?.avatar}
          >
            {user?.name[0] + user?.surname[0]}
          </Avatar>
        )}
        <div className="user-details">
          <ProfileItem title="First Name" value={user?.username} />
          <ProfileItem title="Last Name" value={user?.surname} />
          <ProfileItem title="Email" value={user?.email} />
          <ProfileItem
            title="Registration Date"
            value={user?.registration_date}
          />
          <ProfileItem
            title="role"
            value={user?.is_athlete ? "Athlete" : "Trainer"}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;

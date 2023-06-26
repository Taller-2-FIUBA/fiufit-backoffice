import {
  Avatar,
  Card,
  CardContent,
  Box,
  Button,
  Input,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import * as MUIcon from "@mui/icons-material";
import "./AddFunds.scss";
import {
  UserItem,
  addFundsToUser,
  getBalance,
} from "../../../api/UsersService";
import ModalItem from "../../common/modal-item/ModalItem";

interface UserProfileProps {
  user: UserItem;
  handleOnSuccess: () => void;
}

const AddFunds: React.FC<UserProfileProps> = ({ user, handleOnSuccess }) => {
  const Icon = MUIcon["AttachMoney"];
  const [inputValue, setInputValue] = useState("");
  //  const { mutate: updateUserBalance } = useUpdateUserBalance(user);

  const handleClick = () => {
    // Aquí puedes utilizar el valor de inputValue
    console.log("Valor: ", inputValue);

    try {
      addFundsToUser(user, inputValue);
      handleOnSuccess(); // Cierro el modal
    } catch (error) {
      //TODO esto para el caso de 500, sino identificar el error en particular
      /* setError(
        "Error al guardar el admin. Por favor, inténtelo de nuevo."
      );*/
    }
  };

  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const newBalance = async (user: UserItem) => {
      const balanceResponse = await getBalance(user);
      user.balance = balanceResponse.balance.balance;
      setData(user?.balance ? user?.balance : 0);
    };
    newBalance(user);
  }, []);
  return (
    <Card className="modal-container user-profile">
      <CardContent className="modal-content">
        {user && (
          <Box>
            <Avatar
              className="user-avatar"
              alt={user?.username}
              src={user?.avatar}
            ></Avatar>
            <p className="user-name">{user?.username}</p>
            <Box
              className="user-details"
              sx={{ flexGrow: 1, overflow: "hidden" }}
            >
              <ModalItem title="Name" value={user?.name} icon="Person" />
              <ModalItem title="Surname" value={user?.surname} icon="Person" />
              <ModalItem
                title="Balance"
                value={data ? data : 0}
                icon="AttachMoney"
              />
              <Stack
                className="modal-item"
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <div className="icon-title-container">
                  <Icon fontSize="medium" sx={{ px: 1 }} />
                  <h3 className="modal-item-title">{"Add Fund"}</h3>
                </div>
                <Input
                  value={inputValue}
                  defaultValue={user?.balance ? user?.balance : 0}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                  className="add-new-admin-button"
                  onClick={handleClick}
                  variant="contained"
                >
                  +
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AddFunds;

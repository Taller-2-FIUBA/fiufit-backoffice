import {
  Avatar,
  Card,
  CardContent,
  Box,
  Button,
  Input,
  Stack,
  Typography,
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

  const handleClick = () => {
    console.log("Valor: ", inputValue);

    try {
      addFundsToUser(user, parseFloat(inputValue));
    } catch (error) {
      console.log("Error");
      setErrorAddFund("Error on load data. Please try again.");
    }
    handleOnSuccess(); // Cierro el modal
  };

  const [data, setData] = useState<any>(null);
  const [errorAddFund, setErrorAddFund] = useState<string>("");

  useEffect(() => {
    const newBalance = async (user: UserItem) => {
      const balanceResponse = await getBalance(user);
      user.balance = balanceResponse.balance.balance;
      setData(user?.balance ? user?.balance : 0);
    };
    newBalance(user);
  }, []);

  const ariaLabel = { "aria-label": "description", color: "#fff" };

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
                  inputProps={ariaLabel}
                  placeholder="Amount"
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
            {errorAddFund && (
              <Typography color="error" variant="body1">
                {errorAddFund}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AddFunds;

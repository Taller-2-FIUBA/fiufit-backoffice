import React from "react";
import { Modal } from "@mui/material";
import UserProfile from "../../users/user-profile/UserProfile";
import TrainingDetailView from "../../trainings/training-detail-view/TrainingDetailView";
import AdminCreator from "../../admins/admin-creator/AdminCreator";
import { Training } from "../../../api/TrainingService";
import { UserItem } from "../../../api/UsersService";
import "./ModalWrapper.scss";
import ServiceDetailView from "../../healthcheck/service-detail-view/ServiceDetailView";
import { ServiceItem } from "../../../api/HealthcheckService";
import AddFunds from "../../users/add-funds/Addfunds";

interface ModalProps {
  open: boolean;
  handleOnClose: () => void;
  type:
    | "user-details"
    | "admin-creator"
    | "training-details"
    | "service-details"
    | "add-funds";
  value?: UserItem | Training | ServiceItem | null;
}

function renderSwitch(
  type:
    | "user-details"
    | "admin-creator"
    | "training-details"
    | "service-details"
    | "add-funds",
  value: any,
  handleOnClose: () => void
) {
  switch (type) {
    case "user-details":
      return <UserProfile user={value}></UserProfile>;
    case "admin-creator":
      return <AdminCreator handleOnSuccess={handleOnClose}></AdminCreator>;
    case "training-details":
      return <TrainingDetailView training={value}></TrainingDetailView>;
    case "service-details":
      return <ServiceDetailView service={value}></ServiceDetailView>;
    case "add-funds":
      return <AddFunds user={value} handleOnSuccess={handleOnClose}></AddFunds>;
  }
}

const ModalWrapper: React.FC<ModalProps> = ({
  open,
  handleOnClose,
  type,
  value,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleOnClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {renderSwitch(type, value, handleOnClose)}
    </Modal>
  );
};

export default ModalWrapper;

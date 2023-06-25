import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  IconButton,
} from "@mui/material";
import "./Healthcheck.scss";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { services } from "../../api/utils/services";

import {
  useServiceUsersData,
  useServiceGoalsData,
  ServiceResponse,
  ServiceItem,
  useServiceTrainingsData,
} from "../../api/HealthcheckService";
import React from "react";
import ModalWrapper from "../common/modal-wrapper/ModalWrapper";

const headerRowItems = ["Status", "Service", "Description", "Actions"];

export default function Services() {
  const queryServiceA = useServiceUsersData();
  const queryServiceB = useServiceGoalsData();
  const queryServiceC = useServiceTrainingsData();

  const dataUsers: ServiceResponse | undefined = queryServiceA.data;
  const dataGoals: ServiceResponse | undefined = queryServiceB.data;
  const dataTrainings: ServiceResponse | undefined = queryServiceC.data;

  var data = services;

  if (dataUsers !== undefined) {
    for (var element of data) {
      if (element.item.type == "users") {
        element.item.is_up = dataUsers.uptime ? true : false;
        element.item.uptime = Math.floor(dataUsers.uptime);
      }
    }
  } else {
    for (var element of data) {
      if (element.item.type == "goals") {
        element.item.is_up = false;
      }
    }
  }
  if (dataGoals !== undefined) {
    for (var element of data) {
      if (element.item.type == "goals") {
        element.item.is_up = dataGoals.uptime ? true : false;
        element.item.uptime = Math.floor(dataGoals.uptime);
      }
    }
  } else {
    for (var element of data) {
      if (element.item.type == "goals") {
        element.item.is_up = false;
      }
    }
  }
  if (dataTrainings !== undefined) {
    for (var element of data) {
      if (element.item.type == "trainings") {
        element.item.is_up = dataTrainings.uptime ? true : false;
        element.item.uptime = Math.floor(dataTrainings.uptime);
      }
    }
  } else {
    for (var element of data) {
      if (element.item.type == "trainings") {
        element.item.is_up = false;
      }
    }
  }

  const error = queryServiceA.error /* || queryServiceB.error*/
    ? queryServiceA.error
    : null;
  const isError = queryServiceA.error; /*|| queryServiceB.error*/

  const isLoading = queryServiceA.isLoading; /* || queryServiceB.isLoading;*/

  const navigate = useNavigate();

  if (isError && (error as Error).message === "Unauthorized") {
    navigate("/login");
  }
  const [selectedService, setSelectedService] =
    React.useState<ServiceItem | null>(null);

  const handleDetailViewClick = (service: ServiceItem) => {
    setSelectedService(service);
  };
  const handleDetailServiceClose = () => {
    setSelectedService(null);
  };

  return (
    <Container className="services">
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-header">
            <TableRow hover>
              {headerRowItems.map((item) => (
                <TableCell className="table-row-cell" key={item}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {data &&
              data.map((service) => (
                <TableRow
                  className={
                    service.item.is_up ? "table-row" : "table-row blocked"
                  }
                  hover
                  key={service.item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <div className="table-row-cell status">
                      <span></span>
                    </div>
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {service.item.name}
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {service.item.description}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      className="table-icon"
                      size="large"
                      onClick={() => handleDetailViewClick(service.item)}
                    >
                      <VisibilityIcon></VisibilityIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {isLoading && <div>Loading...</div>}
      </TableContainer>
      <ModalWrapper
        open={!!selectedService}
        handleOnClose={handleDetailServiceClose}
        type="service-details"
        value={selectedService}
      />
    </Container>
  );
}

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

import {
  useServiceUsersData,
  services,
  ServiceResponse,
  ServiceItem,
} from "../../api/HealthcheckService";
import React from "react";
import ModalWrapper from "../common/modal-wrapper/ModalWrapper";

const headerRowItems = ["Status", "Service", "Description", "Actions"];

export default function Services() {
  const queryServiceA = useServiceUsersData();
  //const queryServiceB = useServiceTrainingsData();

  const dataServiceA = queryServiceA.data;
  //  const dataServiceB = queryServiceB.data;
  const dataUsers: ServiceResponse | undefined = queryServiceA.data;
  // const data2: ServiceResponse | undefined = queryServiceB.data;

  //const data: ServiceResponse[] = [];
  var data = services;

  if (dataUsers !== undefined) {
    for (var element of data) {
      if (element.item.type == "users") {
        element.item.is_up = dataUsers.uptime ? true : false;
        element.item.uptime = Math.floor(dataUsers.uptime);
      }
    }
    //data1.uptime es lo unico que me viene de la compu.
    /* data1.item.is_up = false;
    data1.item.description = "Este es el ejemplo ";
    data1.item.name = "";
    data.push(data1);*/
  }
  /* if (data2 !== undefined) {
    data.push(data2);
  }*/

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

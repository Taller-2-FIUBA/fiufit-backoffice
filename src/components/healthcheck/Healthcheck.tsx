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
  TablePagination,
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const { isLoading, isError, error, data } = useServiceUsersData();
  const dataUsers = data;
  const dataGoals: ServiceResponse | undefined = useServiceGoalsData().data;
  const dataTrainings: ServiceResponse | undefined =
    useServiceTrainingsData().data;

  for (var element of services) {
    if (element.item.type == "users") {
      element.item.is_up = dataUsers?.uptime ? true : false;
      element.item.uptime = dataUsers?.uptime
        ? Math.floor(dataUsers.uptime)
        : 0;
    }

    if (element.item.type == "goals") {
      element.item.is_up = dataGoals?.uptime ? true : false;
      element.item.uptime = dataGoals?.uptime
        ? Math.floor(dataGoals.uptime)
        : 0;
    }

    if (element.item.type == "trainings") {
      element.item.is_up = dataTrainings?.uptime ? true : false;
      element.item.uptime = dataTrainings?.uptime
        ? Math.floor(dataTrainings.uptime)
        : 0;
    }
  }

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
            {services &&
              services.map((service) => (
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
        <TablePagination
          className="table-pagination"
          component="div"
          count={services.length || 0}
          page={page}
          onPageChange={(event, newPage) => {
            setPage(newPage);
          }}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 50));
            setPage(0);
          }}
          labelRowsPerPage="Resultados por página:"
        />

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

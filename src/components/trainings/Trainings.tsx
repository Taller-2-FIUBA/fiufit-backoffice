import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import "./Trainings.scss";
import {
  useTrainingsData,
  Training,
  useTrainingUpdate,
} from "../../api/TrainingService";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import ModalWrapper from "../common/modal-wrapper/ModalWrapper";
import { useNavigate } from "react-router-dom";

const headerRowItems = [
  "Status",
  "Id",
  "Title",
  "Trainer",
  "Type",
  "Difficulty",
  "Rating",
  "Actions",
];

export default function Trainings() {
  const { isLoading, isError, error, data } = useTrainingsData();
  const { mutate: updateTraining } = useTrainingUpdate();
  const navigate = useNavigate();

  const [selectedTraining, setSelectedTraining] =
    React.useState<Training | null>(null);

  const handleDetailViewClick = (training: Training) => {
    setSelectedTraining(training);
  };

  const handleDetailTrainingClose = () => {
    setSelectedTraining(null);
  };
  const handleBlockClick = (training: Training) => {
    updateTraining(training);
  };

  if (isError && (error as Error).message === "Unauthorized") {
    navigate("/login");
  }

  return (
    <Container className="trainings">
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
              data.items &&
              data.items.map((training) => (
                <TableRow
                  className={
                    training.blocked ? "table-row blocked" : "table-row"
                  }
                  hover
                  key={training.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <div className="table-row-cell status">
                      <span></span>
                    </div>
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {training.id}
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {training.title}
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {training.trainer_id}
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {training.type}
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {training.difficulty}
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {training.rating}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      className="table-icon"
                      size="large"
                      onClick={() => handleDetailViewClick(training)}
                    >
                      <VisibilityIcon></VisibilityIcon>
                    </IconButton>
                    <IconButton
                      className="table-icon"
                      size="large"
                      onClick={() => handleBlockClick(training)}
                    >
                      <BlockIcon></BlockIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isError && (
          <div>
            <Typography color="error" variant="body1">
              {(error as Error).message}
            </Typography>
          </div>
        )}
        {isLoading && <div>Loading...</div>}
      </TableContainer>
      <ModalWrapper
        open={!!selectedTraining}
        handleOnClose={handleDetailTrainingClose}
        type="training-details"
        value={selectedTraining}
      />
    </Container>
  );
}

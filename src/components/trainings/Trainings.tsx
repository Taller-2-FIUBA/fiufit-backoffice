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
  TextField,
  Select,
  MenuItem,
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

const typesTraining = ["Arm", "Back", "Cardio"]; //TODO nos falta definir bien de qué tipos van a tener

const difficultyLevels = ["Easy", "Medium", "Hard"];
function handleKeyPress(event: any) {
  if (event.key === "Enter") {
    console.log("setTitleFilter", event);
    // Realizar acción cuando se presiona enter
  }
}

const setTrainerFilter = (value: any) => {
  console.log("setTrainerFilter", value);
  return value;
};

const setDifficultyFilter = (value: any) => {
  console.log(value);
  return value;
};

const setTypeFilter = (value: any) => {
  // Acá se llama cuando elijo una opción.
  console.log("setTupeFilter::: ", value);
  return value;
};

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
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  onKeyPress={(e) => handleKeyPress}
                  //   onChange={(e) => setTitleFilter(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  onChange={(e) => setTrainerFilter(e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Select
                  label="Type"
                  variant="standard"
                  size="small"
                  fullWidth
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  {typesTraining.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  label="Difficulty"
                  variant="standard"
                  size="small"
                  fullWidth
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  {difficultyLevels.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  label="Rating"
                  variant="standard"
                  size="small"
                  fullWidth
                  //    onChange={(e) => setRatingFilter(e.target.value)}
                >
                  {Array.from({ length: 6 }, (_, i) => i).map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell />
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
                    {training.tittle}
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

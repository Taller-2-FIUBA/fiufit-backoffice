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
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import "./Trainings.scss";
import {
  useTrainingsData,
  Training,
  useTrainingUpdate,
  Filters,
  useTrainingTypes,
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

const difficultyLevels = ["Easy", "Medium", "Hard"];

function handleKeyPress(type: string, event: any) {
  if (event.key === "Enter") {
    console.log("setTitleFilter", event);
    // Realizar acción cuando se presiona enter
    // Acá debería llamar al servicio nuevamente y re cargar la tabla completamente.
    // https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/types/
  }
}

export default function Trainings() {
  const typesTraining = useTrainingTypes(); //TODO nos falta definir bien de qué tipos van a tener
  console.log(typesTraining.data);

  const { isLoading, isError, error, data } = useTrainingsData();

  const { mutate: updateTraining } = useTrainingUpdate();

  const navigate = useNavigate();

  const [selectedTraining, setSelectedTraining] =
    React.useState<Training | null>(null);

  const [filters, setFilters] = React.useState<Filters>({
    type: "",
    difficulty: "",
  });
  const { refetch } = useTrainingsData(filters);

  const handleDetailViewClick = (training: Training) => {
    setSelectedTraining(training);
  };

  const handleDetailTrainingClose = () => {
    setSelectedTraining(null);
  };
  const handleBlockClick = (training: Training) => {
    updateTraining(training);
  };

  const handleRefreshFilters = (filters: Filters) => {
    setFilters(filters);
    refetch();
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
              <TableCell className="table-row-filter" />
              <TableCell className="table-row-filter" />
              <TableCell className="table-row-filter">
                <TextField
                  className="table-row-filter"
                  variant="standard"
                  size="small"
                  fullWidth
                  onKeyPress={(e) => handleKeyPress("title", e)}
                />
              </TableCell>
              <TableCell className="table-row-filter">
                <TextField
                  className="table-row-filter"
                  variant="standard"
                  size="small"
                  fullWidth
                  onKeyPress={(e) => handleKeyPress("trainer", e)}
                />
              </TableCell>
              <TableCell className="table-row-filter">
                <Select
                  label="Type"
                  variant="standard"
                  size="small"
                  fullWidth
                  value={filters.type}
                  onChange={(e) => {
                    handleRefreshFilters({
                      type: e.target.value as string,
                      difficulty: filters.difficulty,
                    });
                  }}
                >
                  {typesTraining.data?.items.map((item: string) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell className="table-row-filter">
                <Select
                  label="Difficulty"
                  variant="standard"
                  size="small"
                  fullWidth
                  value={filters.difficulty}
                  onChange={(e) => {
                    handleRefreshFilters({
                      type: filters.type,
                      difficulty: e.target.value as string,
                    });
                  }}
                >
                  {difficultyLevels.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell className="table-row-filter"></TableCell>
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

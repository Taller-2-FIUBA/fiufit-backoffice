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
  SelectChangeEvent,
  TablePagination,
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

export default function Trainings() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleKeyPress = (type: string, value: string, event: any) => {
    if (event.key === "Enter") {
      if (type === "title") {
        const newFilters = {
          ...filters,
          title: event.target.value,
        };
        setFilters(newFilters);
        refetch();
      }

      if (type === "trainer") {
        const newFilters = {
          ...filters,
          trainer_id: event.target.value,
        };
        setFilters(newFilters);
        refetch();
      }
    }
  };
  const typesTraining = useTrainingTypes();

  const { mutate: updateTraining } = useTrainingUpdate();

  const navigate = useNavigate();

  const [selectedTraining, setSelectedTraining] =
    React.useState<Training | null>(null);

  const [tituloCargado, setTituloCargado] = React.useState<string>("");
  const [trainerCargado, setTrainerCargado] = React.useState<string>("");

  const [filters, setFilters] = React.useState<Filters>({
    title: "",
    trainer_id: "",
    type: "",
    difficulty: "",
  });

  const { isLoading, isError, error, data } = useTrainingsData(
    page,
    rowsPerPage,
    filters
  );

  const handleChangeType = (event: SelectChangeEvent<string>) => {
    const newFilters = {
      ...filters,
      type: event.target.value,
    };
    setFilters(newFilters);
    console.log("actualizar data");
    refetch();
  };
  const handleChangeDifficulty = (event: SelectChangeEvent<string>) => {
    const newFilters = {
      ...filters,
      difficulty: event.target.value,
    };
    setFilters(newFilters);
    refetch();
  };

  const { refetch } = useTrainingsData(page, rowsPerPage, filters);

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
              <TableCell className="table-row-filter" />
              <TableCell className="table-row-filter" />
              <TableCell className="table-row-filter">
                <TextField
                  className="table-row-filter"
                  variant="standard"
                  size="small"
                  value={tituloCargado}
                  fullWidth
                  onChange={(e) => {
                    setTituloCargado(e.target.value);
                  }}
                  onKeyPress={(e) => handleKeyPress("title", tituloCargado, e)}
                />
              </TableCell>
              <TableCell className="table-row-filter">
                <TextField
                  className="table-row-filter"
                  variant="standard"
                  size="small"
                  value={trainerCargado}
                  onChange={(e) => {
                    setTrainerCargado(e.target.value);
                  }}
                  fullWidth
                  onKeyPress={(e) =>
                    handleKeyPress("trainer", trainerCargado, e)
                  }
                />
              </TableCell>
              <TableCell className="table-row-filter">
                <Select
                  label="Type"
                  variant="standard"
                  size="small"
                  fullWidth
                  value={filters.type}
                  onChange={(event) =>
                    handleChangeType(event as SelectChangeEvent<string>)
                  }
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
                  onChange={(event) =>
                    handleChangeDifficulty(event as SelectChangeEvent<string>)
                  }
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
        <TablePagination
          className="table-pagination"
          component="div"
          count={data?.limit || 0}
          page={page}
          onPageChange={(event, newPage) => {
            setPage(newPage);
          }}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0); // Restablece la página actual al cambiar la cantidad de elementos por página
          }}
          labelRowsPerPage="Resultados por página:"
        />
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
